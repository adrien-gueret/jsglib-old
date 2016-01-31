function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/point", "jsglib/events_handler"], function (exports, _point, _events_handler) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _point2 = _interopRequireDefault(_point);

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

        return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
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

    var Element = (function (_EventsHandler) {
        _inherits(Element, _EventsHandler);

        function Element(x, y) {
            _classCallCheck(this, Element);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Element).call(this));

            _this.prev_position = new _point2.default(x, y);
            _this.position = new _point2.default(x, y);
            _this.layer = null;
            _this.sprite_class = null;
            _this.current_tile = null;
            _this.current_animation = null;
            return _this;
        }

        _createClass(Element, [{
            key: "setSpriteClass",
            value: function setSpriteClass(sprite_class) {
                this.sprite_class = sprite_class;
                this.current_tile = sprite_class.getTile(1);
                return this;
            }
        }, {
            key: "setCurrentTileNumber",
            value: function setCurrentTileNumber(tile_number) {
                this.current_tile = this.sprite_class.getTile(tile_number);

                if (this.layer) {
                    this.layer.needs_clear = true;
                }

                return this;
            }
        }, {
            key: "useAnimation",
            value: function useAnimation(animation_name, time) {
                var _this2 = this;

                var loop = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
                var timer = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

                if (this.current_animation) {
                    this.current_animation.stop();
                }

                var animation_class = this.sprite_class.getAnimationClass(animation_name);

                if (!animation_class) {
                    throw new ReferenceError('Element.useAnimation: animation "' + animation_name + '" is not defined for sprite "' + this.sprite_class.name + '".');
                }

                this.current_animation = new animation_class(timer);
                this.setCurrentTileNumber(this.current_animation.getCurrentTileNumber());
                this.current_animation.on('animation_udpate', function () {
                    _this2.setCurrentTileNumber(_this2.current_animation.getCurrentTileNumber());
                }).start(time, loop);
                return this;
            }
        }, {
            key: "draw",
            value: function draw(ctx) {
                this.current_tile.draw(ctx, this.position.x, this.position.y);
                return this;
            }
        }]);

        return Element;
    })(_events_handler2.default);

    exports.default = Element;
});
//# sourceMappingURL=element.js.map