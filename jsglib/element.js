"use strict";

import EventsHandler from 'jsglib/events_handler';
import Point from "jsglib/point";
import Rectangle from "jsglib/rectangle";

export default class Element extends EventsHandler {
    constructor(x, y) {
        super();
        this.prev_position = new Point(x, y);
        this.position = new Point(x, y);
        this.layer = null;
        this.sprite_class = null;
        this.current_tile = null;
        this.current_animation = null;
        this.speed = new Point();
        this.stop_on_solids = false;
    }

    setSpriteClass(sprite_class) {
        this.sprite_class = sprite_class;
        this.current_tile = sprite_class.getTile(1);
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
        if (this.current_animation) {
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
            .on('animation_udpate', () => {
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

    draw(ctx) {
        this.current_tile.draw(ctx, this.position.x, this.position.y);
        return this;
    }

    getRectangle() {
        let size = this.sprite_class ? this.sprite_class.getTilesSize() : {};
        return new Rectangle(size.width, size.height, this.position);
    }

    move() {
        this.position.add(this.speed, false);
        return this;
    }

    checkCollisions(layers) {
        var has_solid_collision = false;

        for (var layer_name in layers) {
            let layer = layers[layer_name];

            // First, check tiles collisions
            let collisions_data = this.checkTilesCollisions(layer);

            // Check collisions with solid tiles
            if (this.stop_on_solids && collisions_data.solid_collision) {
                has_solid_collision = true;
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
        let delta_position = this.position.substract(this.prev_position);
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