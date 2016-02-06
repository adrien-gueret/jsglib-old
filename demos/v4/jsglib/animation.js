function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(['exports', 'jsglib/events_handler'], function (exports, _events_handler) {
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

    var Animation = (function (_EventsHandler) {
        _inherits(Animation, _EventsHandler);

        function Animation(timer) {
            var tiles_numbers = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
            var default_time = arguments.length <= 2 || arguments[2] === undefined ? 500 : arguments[2];

            _classCallCheck(this, Animation);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Animation).call(this));

            _this.timer = timer;
            _this.default_time = default_time;
            _this.tiles_numbers = tiles_numbers;
            _this.animation_index = 0;
            _this.animation_clock = null;
            return _this;
        }

        _createClass(Animation, [{
            key: 'getPreviousTileNumber',
            value: function getPreviousTileNumber() {
                var tile_index = this.animation_index > 0 ? this.animation_index - 1 : this.tiles_numbers.length - 1;
                return this.tiles_numbers[tile_index];
            }
        }, {
            key: 'getCurrentTileNumber',
            value: function getCurrentTileNumber() {
                return this.tiles_numbers[this.animation_index];
            }
        }, {
            key: 'start',
            value: function start() {
                var _this2 = this;

                var time = arguments.length <= 0 || arguments[0] === undefined ? this.default_time : arguments[0];
                var loop = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
                this.animation_clock = this.timer.setTimeout(function () {
                    _this2.animation_index++;

                    if (_this2.animation_index < _this2.tiles_numbers.length) {
                        _this2.trigger('animation_update');

                        _this2.start(time, loop);
                    } else if (loop) {
                        _this2.stop();

                        _this2.trigger('animation_update');

                        _this2.start(time, loop);
                    }
                }, time);
                return this;
            }
        }, {
            key: 'stop',
            value: function stop() {
                this.timer.clearTimeout(this.animation_clock);
                this.animation_clock = null;
                this.animation_index = 0;
                return this;
            }
        }], [{
            key: 'define',
            value: function define(timer, tiles_numbers, default_time) {
                var name = arguments.length <= 3 || arguments[3] === undefined ? Symbol() : arguments[3];

                Animation.classes[name] = (function (_Animation) {
                    _inherits(_class, _Animation);

                    function _class(default_timer) {
                        _classCallCheck(this, _class);

                        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, timer || default_timer, tiles_numbers, default_time));

                        _this3.name = name;
                        return _this3;
                    }

                    return _class;
                })(Animation);

                return Animation.classes[name];
            }
        }]);

        return Animation;
    })(_events_handler2.default);

    Animation.classes = {};
    exports.default = Animation;
});
//# sourceMappingURL=animation.js.map