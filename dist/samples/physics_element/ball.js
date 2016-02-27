function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/core/element", "jsglib/core/inputs", "jsglib/core/layer", "jsglib/core/sprite", "jsglib/core/point", "jsglib/core/utils", "jsglib/traits/physics"], function (exports, _element, _inputs, _layer, _sprite, _point, _utils, _physics) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
                value: true
        });
        exports.Ball = exports.BallSprite = undefined;

        var _element2 = _interopRequireDefault(_element);

        var _inputs2 = _interopRequireDefault(_inputs);

        var _layer2 = _interopRequireDefault(_layer);

        var _sprite2 = _interopRequireDefault(_sprite);

        var _point2 = _interopRequireDefault(_point);

        var _physics2 = _interopRequireDefault(_physics);

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

        var Ball = (function (_Element) {
                _inherits(Ball, _Element);

                function Ball(game) {
                        _classCallCheck(this, Ball);

                        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Ball).call(this));

                        _this2.stop_on_solids = true;

                        _this2.setSpriteClass(BallSprite);

                        var _this2$getSize = _this2.getSize();

                        var height = _this2$getSize.height;
                        var width = _this2$getSize.width;

                        _this2.position.set(game.current_room.width / 2 - width / 2, height);

                        var gravity = new _point2.default(0, 10);

                        _this2.initPhysics(gravity);

                        _this2.bounce_factor.set(.8);

                        game.inputs.on('click', function (e) {
                                var element_mouse_delta_position = _this2.getRectangle().getCenter().subtract(e.detail.mouse);

                                var impulse = new _point2.default(5, 5).multiply(element_mouse_delta_position).minimum(-200).maximum(200);

                                _this2.applyImpulse(impulse);
                        });

                        _layer2.default.MAIN_LAYER.addElement(_this2);

                        return _this2;
                }

                return Ball;
        })(_element2.default);

        (0, _physics2.default)(Ball);
        exports.Ball = Ball;
});
//# sourceMappingURL=ball.js.map