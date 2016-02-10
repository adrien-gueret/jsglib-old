"use strict";

export default class EventsHandler {
    constructor() {
        this.events_handler = document.createElement('div');
        this.all_callbacks = {};
    }

    on(event_name, callback) {
        this.events_handler.addEventListener('jsglib.' + event_name, callback, false);

        if (!this.all_callbacks[event_name]) {
            this.all_callbacks[event_name] = [];
        }

        this.all_callbacks[event_name].push(callback);

        return this;
    }

    off(event_name, callback) {
        if (!event_name) {
            for (let name in this.all_callbacks) {
                this.off(name);
            }

            return this;
        }

        if (callback) {
            this.events_handler.removeEventListener('jsglib.' + event_name, callback, false);
        } else if (this.all_callbacks[event_name]) {
            this.all_callbacks[event_name].forEach(callback => {
                this.off(event_name, callback);
            });
            delete this.all_callbacks[event_name];
        }

        return this;
    }

    trigger(event_name, data = {}) {
        let custom_event = new CustomEvent('jsglib.' + event_name, {detail: data, bubbles: false, cancelable: true});
        custom_event.propagationStopped = false;
        custom_event.stopPropagation = function () {
            this.propagationStopped = true;
            CustomEvent.prototype.stopPropagation.apply(this);
        };

        this.events_handler.dispatchEvent(custom_event);
        return custom_event;
    }
}