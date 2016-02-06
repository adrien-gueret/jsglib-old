define(['exports'], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = (function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    })();

    var EventsHandler = (function () {
        function EventsHandler() {
            _classCallCheck(this, EventsHandler);

            this.events_handler = document.createElement('div');
            this.all_callbacks = {};
        }

        _createClass(EventsHandler, [{
            key: 'on',
            value: function on(event_name, callback) {
                this.events_handler.addEventListener('jsglib.' + event_name, callback, false);

                if (!this.all_callbacks[event_name]) {
                    this.all_callbacks[event_name] = [];
                }

                this.all_callbacks[event_name].push(callback);
                return this;
            }
        }, {
            key: 'off',
            value: function off(event_name, callback) {
                var _this = this;

                if (callback) {
                    this.events_handler.removeEventListener('jsglib.' + event_name, callback, false);
                } else if (this.all_callbacks[event_name]) {
                    this.all_callbacks[event_name].forEach(function (callback) {
                        _this.off(event_name, callback);
                    });
                    delete this.all_callbacks[event_name];
                }

                return this;
            }
        }, {
            key: 'trigger',
            value: function trigger(event_name) {
                var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                var custom_event = new CustomEvent('jsglib.' + event_name, {
                    detail: data,
                    bubbles: false,
                    cancelable: true
                });
                custom_event.propagationStopped = false;

                custom_event.stopPropagation = function () {
                    this.propagationStopped = true;
                    CustomEvent.prototype.stopPropagation.apply(this);
                };

                this.events_handler.dispatchEvent(custom_event);
                return custom_event;
            }
        }]);

        return EventsHandler;
    })();

    exports.default = EventsHandler;
});
//# sourceMappingURL=events_handler.js.map