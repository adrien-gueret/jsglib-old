"use strict";

import Trait from "jsglib/trait";

class JSGlibEvent {
    constructor(detail) {
        this.defaultPrevented = false;
        this.propagationStopped = false;
        this.detail = detail;
    }

    stopPropagation() {
        this.propagationStopped = true;
    }

    preventDefault() {
        this.defaultPrevented = true;
    }
}

function initEventsCallback(handler) {
    if (!handler.$events_callbacks) {
        handler.$events_callbacks = {};
    }
}

let Trait_EventsHandler = Trait({
    on(event_name, callback) {
        initEventsCallback(this);

        if (!this.$events_callbacks[event_name]) {
            this.$events_callbacks[event_name] = [];
        }

        this.$events_callbacks[event_name].push(callback);

        return this;
    },

    off(event_name, callback) {
        initEventsCallback(this);

        if (!event_name) {
            for (let name in this.$events_callbacks) {
                this.off(name);
            }

            return this;
        }

        if (!this.$events_callbacks[event_name]) {
            return this;
        }

        if (callback) {
            this.$events_callbacks[event_name].some((event_callback, index) => {
                if (callback === event_callback) {
                    this.$events_callbacks[event_name].splice(index, 1);
                    return true;
                }
            });

            if (!this.$events_callbacks[event_name].length) {
                delete this.$events_callbacks[event_name];
            }

            return this;
        }

        delete this.$events_callbacks[event_name];

        return this;
    },

    trigger(event_name, detail = {}) {
        initEventsCallback(this);

        let custom_event = new JSGlibEvent(detail);

        if (!this.$events_callbacks[event_name]) {
            return custom_event;
        }

        this.$events_callbacks[event_name].some(callback => {
            callback(custom_event);
            return custom_event.propagationStopped;
        });

        return custom_event;
    }
});

export default Trait_EventsHandler;