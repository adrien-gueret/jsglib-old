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
            if (this.stop_on_solids && collisions_data.solid_collision) {
                has_solid_collision = true;
                solid_tiles = solid_tiles.concat(collisions_data.tiles.filter(tile_data => tile_data.tile.isSolid()));
                this.refinePosition(layer, this.checkTilesCollisions);
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
            solid_collision: false
        };

        if (!layer.tiles.length) {
            return data;
        }

        let rectangle = this.getRectangle();
        rectangle.position.copy(position);

        data.tiles = layer.getTilesFromRectangle(rectangle);

        data.solid_collision = data.tiles.some(tile_data => tile_data.tile.isSolid());

        return data;
    }

    refinePosition(layer, checkCollisionsMethod) {
        let delta_position = this.position.subtract(this.prev_position);
        let limit_x = Math.abs(delta_position.x);
        let limit_y = Math.abs(delta_position.y);
        let delta_x = Math.sign(delta_position.x);
        let delta_y = Math.sign(delta_position.y);
        let new_position = this.prev_position.clone();

        // Refine X
        for (let x = 0; x < limit_x; x++) {
            new_position.x += delta_x;

            if (checkCollisionsMethod.call(this, layer, new_position).solid_collision) {
                new_position.x -= delta_x;
                break;
            }
        }

        // Refine Y
        for (let y = 0; y < limit_y; y++) {
            new_position.y += delta_y;

            if (checkCollisionsMethod.call(this, layer, new_position).solid_collision) {
                new_position.y -= delta_y;
                break;
            }
        }

        this.position.copy(new_position);
    }
}

Trait_EventsHandler(Element);

export default Element;