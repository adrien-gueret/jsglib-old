define(["exports"], function (exports) {
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

    var JSGlibEvent = (function () {
        function JSGlibEvent(detail) {
            _classCallCheck(this, JSGlibEvent);

            this.defaultPrevented = false;
            this.propagationStopped = false;
            this.detail = detail;
        }

        _createClass(JSGlibEvent, [{
            key: "stopPropagation",
            value: function stopPropagation() {
                this.propagationStopped = true;
            }
        }, {
            key: "preventDefault",
            value: function preventDefault() {
                this.defaultPrevented = true;
            }
        }]);

        return JSGlibEvent;
    })();

    function initEventsCallback(handler) {
        if (!handler.$events_callbacks) {
            handler.$events_callbacks = {};
        }
    }

    var EventsHandler = (function () {
        function EventsHandler() {
            _classCallCheck(this, EventsHandler);
        }

        _createClass(EventsHandler, [{
            key: "on",
            value: function on(event_name, callback) {
                initEventsCallback(this);

                if (!this.$events_callbacks[event_name]) {
                    this.$events_callbacks[event_name] = [];
                }

                this.$events_callbacks[event_name].push(callback);
                return this;
            }
        }, {
            key: "off",
            value: function off(event_name, callback) {
                var _this = this;

                initEventsCallback(this);

                if (!event_name) {
                    for (var name in this.$events_callbacks) {
                        this.off(name);
                    }

                    return this;
                }

                if (!this.$events_callbacks[event_name]) {
                    return this;
                }

                if (callback) {
                    this.$events_callbacks[event_name].some(function (event_callback, index) {
                        if (callback === event_callback) {
                            _this.$events_callbacks[event_name].splice(index, 1);

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
            }
        }, {
            key: "trigger",
            value: function trigger(event_name) {
                var detail = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                initEventsCallback(this);
                var custom_event = new JSGlibEvent(detail);

                if (!this.$events_callbacks[event_name]) {
                    return custom_event;
                }

                this.$events_callbacks[event_name].some(function (callback) {
                    callback(custom_event);
                    return custom_event.propagationStopped;
                });
                return custom_event;
            }
        }]);

        return EventsHandler;
    })();

    exports.default = EventsHandler;
});
//# sourceMappingURL=events_handler.js.map