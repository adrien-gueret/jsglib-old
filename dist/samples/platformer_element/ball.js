function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/platformer/platform_player", "jsglib/core/layer", "jsglib/core/sprite", "./star"], function (exports, _platform_player, _layer, _sprite, _star) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
                value: true
        });
        exports.Ball = exports.BallSprite = undefined;

        var _platform_player2 = _interopRequireDefault(_platform_player);

        var _layer2 = _interopRequireDefault(_layer);

        var _sprite2 = _interopRequireDefault(_sprite);

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

        var BallSprite = exports.BallSprite = (function (_Sprite) {
                _inherits(BallSprite, _Sprite);

                function BallSprite() {
                        _classCallCheck(this, BallSprite);

                        return _possibleConstructorReturn(this, Object.getPrototypeOf(BallSprite).apply(this, arguments));
                }

                return BallSprite;
        })(_sprite2.default);

        var Ball = exports.Ball = (function (_PlatformPlayer) {
                _inherits(Ball, _PlatformPlayer);

                function Ball(x, y, game) {
                        _classCallCheck(this, Ball);

                        // Indicate the sprite class to use

                        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Ball).call(this, x, y, game.inputs));
                        // We must call the parent's constructor

                        _this2.setSpriteClass(BallSprite);

                        _this2.onCollision(_star.Star, function (element) {
                                return element.destroy();
                        });

                        // Add player to layer in order to display it
                        _layer2.default.MAIN_LAYER.addElement(_this2);
                        return _this2;
                }

                return Ball;
        })(_platform_player2.default);
});
//# sourceMappingURL=ball.js.map