(function(window, document, undefined) {
    "use strict";

    let JSGlib = window.JSGlib || {};

    JSGlib.EventsHandler = class EventsHandler {
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
			let custom_event = new CustomEvent('jsglib.' + event_name, {detail: data});
			return this.events_handler.dispatchEvent(custom_event);
		}
    };

    window.JSGlib = JSGlib;
})(window, document);