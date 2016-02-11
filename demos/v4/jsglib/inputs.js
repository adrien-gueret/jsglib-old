function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(['exports', 'jsglib/events_handler', 'jsglib/point'], function (exports, _events_handler, _point) {
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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Inputs = (function (_EventsHandler) {
        _inherits(Inputs, _EventsHandler);

        function Inputs(dom_element) {
            _classCallCheck(this, Inputs);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Inputs).call(this));

            _this.mouse = new _point2.default();
            _this.keys_pressed = [];
            _this.dom_element = dom_element;

            _this.$mouseMoveEventHandler = function (e) {
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

            _this.$clickHandler = function () {
                _this.trigger('click', {
                    mouse: _this.mouse
                });
            };

            _this.$keyDownHandler = function (e) {
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

            _this.$keyUpHandler = function (e) {
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

            dom_element.addEventListener('mousemove', _this.$mouseMoveEventHandler);
            dom_element.addEventListener('click', _this.$clickHandler);
            document.body.addEventListener('keydown', _this.$keyDownHandler);
            document.body.addEventListener('keyup', _this.$keyUpHandler);
            return _this;
        }

        _createClass(Inputs, [{
            key: 'destroy',
            value: function destroy() {
                this.dom_element.removeEventListener('mousemove', this.$mouseMoveEventHandler);
                this.dom_element.removeEventListener('click', this.$clickHandler);
                document.body.removeEventListener('keydown', this.$keyDownHandler);
                document.body.removeEventListener('keyup', this.$keyUpHandler);
                this.off();
                this.dom_element = null;
                this.mouse = null;
                this.keys_pressed = [];
                return this;
            }
        }, {
            key: 'isKeyPressed',
            value: function isKeyPressed(key) {
                return this.keys_pressed.indexOf(key) >= 0;
            }
        }, {
            key: 'getPressedArrows',
            value: function getPressedArrows() {
                var arrows_keys = [];

                for (var key_name in Inputs.KEYS.ARROWS) {
                    var key = Inputs.KEYS.ARROWS[key_name];

                    if (this.isKeyPressed(key)) {
                        arrows_keys.push(key);
                    }
                }

                return arrows_keys;
            }
        }]);

        return Inputs;
    })(_events_handler2.default);

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
    exports.default = Inputs;
});
//# sourceMappingURL=inputs.js.map