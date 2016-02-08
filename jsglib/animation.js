"use strict";

import EventsHandler from 'jsglib/events_handler';

class Animation extends EventsHandler {
    constructor(timer, tiles_numbers = [], default_time = 500) {
        super();
        this.timer = timer;
        this.default_time = default_time;
        this.tiles_numbers = tiles_numbers;
        this.animation_index = 0;
        this.animation_clock = null;
        this.is_running = false;
    }

    getPreviousTileNumber() {
        let tile_index = this.animation_index > 0 ? this.animation_index - 1 : this.tiles_numbers.length - 1;

        return this.tiles_numbers[tile_index];
    }

    getCurrentTileNumber() {
        return this.tiles_numbers[this.animation_index];
    }

    start(time = this.default_time, loop = true) {
        this.is_running = true;

        this.animation_clock = this.timer.setTimeout(() => {
            this.animation_index++;

            if (this.animation_index < this.tiles_numbers.length) {
                this.trigger('animation_update');
                this.start(time, loop);
            } else if (loop) {
                this.stop();
                this.trigger('animation_update');
                this.start(time, loop);
            } else {
                this.stop();
                this.trigger('animation_end');
            }
        }, time);
        return this;
    }

    stop() {
        this.timer.clearTimeout(this.animation_clock);
        this.animation_clock = null;
        this.animation_index = 0;
        this.is_running = false;
        return this;
    }

    static define(timer, tiles_numbers, default_time, name = Symbol()) {
        Animation.classes[name] = class extends Animation {
            constructor(default_timer) {
                super(timer || default_timer, tiles_numbers, default_time);
                this.name = name;
            }
        };

        return Animation.classes[name];
    }
}

Animation.classes = {};

export default Animation;
