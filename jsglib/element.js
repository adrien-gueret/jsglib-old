"use strict";

import Point from "jsglib/point";
import EventsHandler from 'jsglib/events_handler';

export default class Element extends EventsHandler {
    constructor(x, y) {
        super();
        this.prev_position = new Point(x, y);
        this.position = new Point(x, y);
        this.layer = null;
        this.sprite_class = null;
        this.current_tile = null;
        this.current_animation = null;
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

    draw(ctx) {
        this.current_tile.draw(ctx, this.position.x, this.position.y);
        return this;
    }
}
