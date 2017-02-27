"use strict";

import Trait_EventsHandler from "../traits/events_handler";

class Timer {
    constructor(fps = 30) {
        this.fps = fps;
        this.clocks = {};

        this.on('frame', () => {
            this.checkCounters();
        });
    }

    destroy() {
        this.clocks = {};
        this.off();
        return this;
    }

    checkCounters() {
        for (let generated_event_name in this.clocks) {
            let clock = this.clocks[generated_event_name];
            if (++clock.counter >= clock.target) {
                this.trigger(generated_event_name);
                this.clearTimeout(generated_event_name);
            }
        }

        return this;
    }

    setTimeout(callback, time) {
        let generated_event_name = (Date.now() * Math.random()).toString(16);
        this.clocks[generated_event_name] = {
            counter: 0,
            target: (time / 1000) * this.fps
        };
        this.on(generated_event_name, callback);
        return generated_event_name;
    }

    clearTimeout(generated_event_name) {
        delete this.clocks[generated_event_name];
        return this.off(generated_event_name);
    }
}

Trait_EventsHandler(Timer);

export default Timer;