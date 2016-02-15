function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/element", "jsglib/layer", "jsglib/utils", "jsglib/traits/move_wrap", "./sprites"], function (exports, _element, _layer, _utils, _move_wrap, _sprites) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
                value: true
        });

        var _element2 = _interopRequireDefault(_element);

        var _layer2 = _interopRequireDefault(_layer);

        var _move_wrap2 = _interopRequireDefault(_move_wrap);

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

        function getRandomSpeed() {
                var speeds = (0, _utils.shuffleArray)([0, 20, 30, 40, 50]);
                var speed = speeds[0];
                return (0, _utils.random)(0, 1) ? speed : -speed;
        }

        var Head = (function (_Element) {
                _inherits(Head, _Element);

                function Head(room_size, tile_number) {
                        _classCallCheck(this, Head);

                        var head_size = _sprites.SmallHeadsSprite.getTilesSize();

                        var x = (0, _utils.random)(0, room_size.width - head_size.width);
                        var y = (0, _utils.random)(0, room_size.height - head_size.height);

                        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Head).call(this, x, y));

                        _this.speed.set(getRandomSpeed(), getRandomSpeed());

                        _this.setSpriteClass(_sprites.SmallHeadsSprite, tile_number);

                        _this.initMoveWrap();

                        _layer2.default.MAIN_LAYER.addElement(_this);

                        return _this;
                }

                return Head;
        })(_element2.default);

        (0, _move_wrap2.default)(Head);
        exports.default = Head;
});
//# sourceMappingURL=head.js.map