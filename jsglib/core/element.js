"use strict";

import Trait_EventsHandler from "jsglib/traits/events_handler";
import Point from "jsglib/core/point";
import Rectangle from "jsglib/core/rectangle";
import {degreeToRadian, radianToDegree} from "jsglib/core/utils";

class Element {
    constructor(x, y) {
        this.prev_position = new Point(NaN, NaN);
        this.position = new Point(x, y);
        this.transform_origin = new Point();
        this.rotation = 0;
        this.layer = null;
        this.sprite_class = null;
        this.current_tile = null;
        this.current_animation = null;
        this.speed = new Point();
        this.acceleration = new Point();
        this.stop_on_solids = false;
        this.is_destroyed = false;
        this.is_inside_room = false;
    }

    destroy() {
        let custom_event = this.trigger('destroy');

        if (custom_event.defaultPrevented) {
            return this;
        }

        this.is_destroyed = true;
        return this;
    }

    setSpriteClass(sprite_class, current_tile_number = 1) {
        this.sprite_class = sprite_class;
        this.current_tile = sprite_class.getTile(current_tile_number);
        return this;
    }

    setCurrentTileNumber(tile_number) {
        this.current_tile = this.sprite_class.getTile(tile_number);

        if (this.layer) {
            this.layer.needs_clear = true;
        }

        return this;
    }

    useAnimation(animation_name, time, loop = true, timer = null) {
        if (this.current_animation && this.current_animation.is_running) {
            if (this.getAnimationName() === animation_name) {
                return this;
            }

            this.current_animation.stop();
        }

        let animation_class = this.sprite_class.getAnimationClass(animation_name);

        if (!animation_class) {
            throw new ReferenceError('Element.useAnimation: animation "' + animation_name + '" is not defined for sprite "' + this.sprite_class.name + '".');
        }

        this.current_animation = new animation_class(timer);

        this.setCurrentTileNumber(this.current_animation.getCurrentTileNumber());

        this.current_animation
            .on('animation_update', () => {
                this.setCurrentTileNumber(this.current_animation.getCurrentTileNumber());
            })
            .start(time, loop);

        return this;
    }

    getAnimationName() {
        return this.current_animation ? this.current_animation.name : '';
    }

    getSize() {
        let {width, height} = this.getRectangle();
        return {width, height};
    }

    getDirection(to_degree = true) {
        let direction = Math.atan2(-this.speed.y, this.speed.x);
        return to_degree ? radianToDegree(direction) : direction;
    }

    draw(ctx) {
        let transform_origin = this.position.add(this.transform_origin, true);
        let draw_position = this.position.subtract(transform_origin, true);

        ctx.save();
        ctx.translate(transform_origin.x, transform_origin.y);
        ctx.rotate(degreeToRadian(this.rotation));

        this.current_tile.draw(ctx, draw_position.x, draw_position.y);

        ctx.restore();

        return this;
    }

    getRectangle() {
        let size = this.sprite_class ? this.sprite_class.getTilesSize() : {};
        return new Rectangle(size.width, size.height, this.position);
    }

    setTransformOriginToCenter() {
        let {width, height} = this.getSize();
        this.transform_origin.set(width / 2, height / 2);
        return this;
    }

    move(delta_time) {
        let delta_position = new Point(delta_time, delta_time);
        this.speed.add(this.acceleration);
        this.position.add(this.speed.multiply(delta_position, true));
        return this;
    }

    checkCollisions(layers) {
        let has_solid_collision = false;
        let solid_tiles = [];

        for (var layer_name in layers) {
            let layer = layers[layer_name];

            // First, check tiles collisions
            let collisions_data = this.checkTilesCollisions(layer);

            // Check collisions with solid tiles
            if (this.stop_on_solids && collisions_data.solids_collisions) {
                has_solid_collision = true;

                let new_solid_tiles = collisions_data.tiles.filter(tile_data => tile_data.tile.isSolid());
                solid_tiles = solid_tiles.concat(new_solid_tiles);

                this.refinePosition(layer, this.checkTilesCollisions);

                if (collisions_data.slopes_collisions) {
                    this.refinePositionOnSlopes(new_solid_tiles.filter(tile_data => tile_data.tile.isSlope()));
                }
            }

            // Trigger collision events for each tile
            collisions_data.tiles.some((tile_data) => {
                let custom_event = this.trigger('tile_collision', {tile_data});
                return custom_event.propagationStopped;
            });
        }

        if (!has_solid_collision) {
            this.trigger('no_solids_collision');
        } else {
            this.trigger('solids_collision', {
                tiles: solid_tiles
            });
        }
    }

    checkTilesCollisions(layer, position = this.position) {
        let data = {
            tiles: [],
            solids_collisions: false,
            slopes_collisions: false,
            only_slopes_collisions: false
        };

        if (!layer.tiles.length) {
            return data;
        }

        let rectangle = this.getRectangle();
        rectangle.position.copy(position);

        data.tiles = layer.getTilesFromRectangle(rectangle);

        let end_slope_tile = data.tiles.filter(tile_data => tile_data.tile.isEndSlope())[0];

        // If collision with "end of slope" tile, ignore solid directly next to this tile
        if (end_slope_tile) {
            let contact_y = end_slope_tile.tile.getContactY(rectangle.getCenter().x, end_slope_tile.position);

            // Ignore only if element can interact with this slope
            if (!isNaN(contact_y)) {
                let delta = end_slope_tile.tile.getSize().width;

                if (end_slope_tile.tile.slope_point.x === 0) {
                    delta *= -1;
                }

                data.tiles = data.tiles.filter(tile_data => {
                    return !(tile_data.tile.isSolid() &&
                    tile_data.position.y === end_slope_tile.position.y &&
                    tile_data.position.x === end_slope_tile.position.x + delta);
                });
            }
        }

        let solids_tiles = data.tiles.filter(tile_data => tile_data.tile.isSolid());
        data.solids_collisions = solids_tiles.length > 0;
        data.slopes_collisions = data.solids_collisions && solids_tiles.some(tile_data => tile_data.tile.isSlope());
        data.only_slopes_collisions = data.slopes_collisions && solids_tiles.every(tile_data => tile_data.tile.isSlope());

        return data;
    }

    refinePosition(layer, checkCollisionsMethod) {
        let delta_position = this.position.subtract(this.prev_position, true);
        let limit_x = Math.abs(delta_position.x);
        let limit_y = Math.abs(delta_position.y);
        let delta_x = Math.sign(delta_position.x);
        let delta_y = Math.sign(delta_position.y);
        let new_position = this.prev_position.clone();

        // Refine X
        for (let x = 0; x < limit_x; x++) {
            new_position.x += delta_x;

            let collisions_data = checkCollisionsMethod.call(this, layer, new_position);
            if (collisions_data.solids_collisions && !collisions_data.only_slopes_collisions) {
                new_position.x -= delta_x;
                break;
            }
        }

        // Refine Y
        for (let y = 0; y < limit_y; y++) {
            new_position.y += delta_y;

            let collisions_data = checkCollisionsMethod.call(this, layer, new_position);
            if (collisions_data.solids_collisions && !collisions_data.only_slopes_collisions) {
                new_position.y -= delta_y;
                break;
            }
        }

        this.position.copy(new_position);

        return this;
    }

    refinePositionOnSlopes(slopes_tiles_data) {
        let new_position = this.position.clone();
        let height = this.getSize().height;
        let center_x = this.getRectangle().getCenter().x;

        return slopes_tiles_data.some(slope_data => {
            let y_contact = slope_data.tile.getContactY(center_x, slope_data.position);

            if (isNaN(y_contact)) {
                return false;
            }

            new_position.y = y_contact - height - 1;

            if (new_position.y - this.position.y >= 0) {
                return true;
            }

            this.position.copy(new_position).round();

            return true;
        });
    }
}

Trait_EventsHandler(Element);

export default Element;