define(["exports", "jsglib/traits/events_handler", "jsglib/core/point"], function (exports, _events_handler, _point) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _events_handler2 = _interopRequireDefault(_events_handler);

    var _point2 = _interopRequireDefault(_point);

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

    var Inputs = (function () {
        function Inputs(dom_element) {
            var _this = this;

            _classCallCheck(this, Inputs);

            this.mouse = new _point2.default();
            this.keys_pressed = [];
            this.dom_element = dom_element;

            this.$mouseMoveEventHandler = function (e) {
                var dom_element = _this.dom_element;
                var x = e.pageX;
                var y = e.pageY;
                x -= dom_element.getBoundingClientRect().left + (window.pageXOffset || dom_element.scrollLeft) + (dom_element.clientLeft || 0);
                y -= dom_element.getBoundingClientRect().top + (window.pageYOffset || dom_element.scrollTop) + (dom_element.clientTop || 0);

                _this.mouse.set(Math.floor(x), Math.floor(y));

                _this.trigger('mousemove', {
                    mouse: _this.mouse
                });
            };

            this.$clickHandler = function () {
                _this.trigger('click', {
                    mouse: _this.mouse
                });
            };

            this.$keyDownHandler = function (e) {
                var key = e.which || e.keyCode;

                if (_this.isKeyPressed(key)) {
                    return;
                }

                if (_this.keys_pressed.length >= 2) {
                    return;
                }

                _this.keys_pressed.push(key);

                var custom_event = _this.trigger('keydown', {
                    key: key,
                    is_arrow: key >= Inputs.KEYS.ARROWS.LEFT && key <= Inputs.KEYS.ARROWS.DOWN
                });

                if (custom_event.defaultPrevented) {
                    e.preventDefault();
                }
            };

            this.$keyUpHandler = function (e) {
                var key = e.which || e.keyCode;

                _this.keys_pressed.some(function (current_key, key_index) {
                    if (key === current_key) {
                        _this.keys_pressed.splice(key_index, 1);

                        return true;
                    }
                });

                var custom_event = _this.trigger('keyup', {
                    key: key,
                    is_arrow: key >= Inputs.KEYS.ARROWS.LEFT && key <= Inputs.KEYS.ARROWS.DOWN
                });

                if (custom_event.defaultPrevented) {
                    e.preventDefault();
                }
            };

            this.$windowFocusHandler = function () {
                _this.trigger('window_focus');
            };

            this.$windowBlurHandler = function () {
                _this.trigger('window_blur');
            };

            dom_element.addEventListener('mousemove', this.$mouseMoveEventHandler);
            dom_element.addEventListener('click', this.$clickHandler);
            document.body.addEventListener('keydown', this.$keyDownHandler);
            document.body.addEventListener('keyup', this.$keyUpHandler);
            window.addEventListener('focus', this.$windowFocusHandler);
            window.addEventListener('blur', this.$windowBlurHandler);
        }

        _createClass(Inputs, [{
            key: "destroy",
            value: function destroy() {
                this.dom_element.removeEventListener('mousemove', this.$mouseMoveEventHandler);
                this.dom_element.removeEventListener('click', this.$clickHandler);
                document.body.removeEventListener('keydown', this.$keyDownHandler);
                document.body.removeEventListener('keyup', this.$keyUpHandler);
                window.removeEventListener('focus', this.$windowFocusHandler);
                window.removeEventListener('blur', this.$windowBlurHandler);
                this.off();
                this.dom_element = null;
                this.mouse = null;
                this.keys_pressed = [];
                return this;
            }
        }, {
            key: "isKeyPressed",
            value: function isKeyPressed(key) {
                return this.keys_pressed.indexOf(key) >= 0;
            }
        }]);

        return Inputs;
    })();

    Inputs.KEYS = {
        ARROWS: {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        },
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        CONTROL: 17,
        ALT: 18,
        CAPS_LOCK: 20,
        SPACE: 32,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90
    };
    (0, _events_handler2.default)(Inputs);
    exports.default = Inputs;
});
//# sourceMappingURL=inputs.js.map