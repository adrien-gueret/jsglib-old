define(["exports", "jsglib/traits/events_handler"], function (exports, _events_handler) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _events_handler2 = _interopRequireDefault(_events_handler);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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

    var Timer = (function () {
        function Timer() {
            var _this = this;

            var fps = arguments.length <= 0 || arguments[0] === undefined ? 30 : arguments[0];

            _classCallCheck(this, Timer);

            this.fps = fps;
            this.clocks = {};
            this.on('frame', function () {
                _this.checkCounters();
            });
        }

        _createClass(Timer, [{
            key: "destroy",
            value: function destroy() {
                this.clocks = {};
                this.off();
                return this;
            }
        }, {
            key: "checkCounters",
            value: function checkCounters() {
                for (var generated_event_name in this.clocks) {
                    var clock = this.clocks[generated_event_name];

                    if (++clock.counter >= clock.target) {
                        this.trigger(generated_event_name);
                        this.clearTimeout(generated_event_name);
                    }
                }

                return this;
            }
        }, {
            key: "setTimeout",
            value: function setTimeout(callback, time) {
                var generated_event_name = (Date.now() * Math.random()).toString(16);
                this.clocks[generated_event_name] = {
                    counter: 0,
                    target: time / 1000 * this.fps
                };
                this.on(generated_event_name, callback);
                return generated_event_name;
            }
        }, {
            key: "clearTimeout",
            value: function clearTimeout(generated_event_name) {
                delete this.clocks[generated_event_name];
                return this.off(generated_event_name);
            }
        }]);

        return Timer;
    })();

    (0, _events_handler2.default)(Timer);
    exports.default = Timer;
});
//# sourceMappingURL=timer.js.map