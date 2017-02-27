import Trait from "../core/trait";

class JSGLibEvent {
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

/**
 * @trait Events_Handler
 * @description
 * Trait adding events related features, in order to be able to listen and trigger custom events.
 * @property {Object} $events_callbacks Collection of events and their callbacks listened by current instance.
 */
const Events_Handler = Trait({
    /**
     * @method on
     * @public
     * @description Add an event listener.
     * @param {String} event_name Name of the event to listen.
     * @param {Function} callback Function to call when `event_name` is triggered. It receive a **JSGLibEvent** as
     * parameter.
     * @return {Core.Element} This instance.
     * @example
     * myInstance.on('my_event_name', (e) => {
     *  console.log(e);
     *  // ...
     * });
     */
    on(event_name, callback) {
        initEventsCallback(this);

        if (!this.$events_callbacks[event_name]) {
            this.$events_callbacks[event_name] = [];
        }

        this.$events_callbacks[event_name].push(callback);

        return this;
    },

    /**
     * @method off
     * @public
     * @description Remove one or multiple events listeners.
     * @param {String} [event_name] Name of the event to remove. If omitted, all events will be removed.
     * @param {Function} [callback] Function to remove from specific `event_name`. If omitted, all listeners from
     * `event_name` will be removed.
     * @return {Core.Element} This instance.
     * @example myInstance.off();
     * @example myInstance.off('my_event_name');
     * @example myInstance.off('my_event_name', myCallback);
     */
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

    /**
     * @method trigger
     * @public
     * @description Trigger the specific event and execute the registered corresponding callbacks.
     * @param {String} [event_name] Name of the event to trigger.
     * @param {Object} [detail={}] Details of the event to send.
     * @return {Event} A custom **JSGLibEvent**.
     * @example myInstance.trigger('my_event_name');
     * @example myInstance.trigger('my_event_name', { someData: 'someValue' });
     */
    trigger(event_name, detail = {}) {
        initEventsCallback(this);

        let custom_event = new JSGLibEvent(detail);

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

export default Events_Handler;