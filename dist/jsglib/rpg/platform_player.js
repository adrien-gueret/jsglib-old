function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/core/element", "jsglib/core/point", "jsglib/core/inputs", "jsglib/traits/physics"], function (exports, _element, _point, _inputs, _physics) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _element2 = _interopRequireDefault(_element);

    var _point2 = _interopRequireDefault(_point);

    var _inputs2 = _interopRequireDefault(_inputs);

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

    var PlatformPlayer = (function (_Element) {
        _inherits(PlatformPlayer, _Element);

        function PlatformPlayer(x, y, inputs) {
            _classCallCheck(this, PlatformPlayer);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlatformPlayer).call(this, x, y));

            var MAX_SPEED = _this.constructor.MAX_SPEED;
            var ACCELERATION_LIMIT = MAX_SPEED / 4;
            var Y_SPEED_LIMIT = MAX_SPEED * 2;
            var JUMP_VARIATION = MAX_SPEED / ACCELERATION_LIMIT;
            _this.stop_on_solids = true;

            _this.initPhysics();

            _this.movements_resistance.x = 10;

            _this.acceleration.minimum(-ACCELERATION_LIMIT).maximum(ACCELERATION_LIMIT);

            _this.speed.minimum(-MAX_SPEED, -Y_SPEED_LIMIT).maximum(MAX_SPEED, Y_SPEED_LIMIT * 2);

            _this.acceleration_delta = new _point2.default(3, 0);
            inputs.on('keydown', function (e) {
                if (_this.on_ground && e.detail.key === _inputs2.default.KEYS.ARROWS.UP) {
                    _this.speed.y = 0;

                    _this.applyImpulse(new _point2.default(0, -Y_SPEED_LIMIT));
                }
            });

            _this.on('frame', function () {
                if (inputs.isKeyPressed(_inputs2.default.KEYS.ARROWS.LEFT)) {
                    _this.acceleration.subtract(_this.acceleration_delta);
                } else if (_this.acceleration.x < 0) {
                    _this.acceleration.add(_this.acceleration_delta);

                    _this.acceleration.x = Math.min(0, _this.acceleration.x);
                }

                if (inputs.isKeyPressed(_inputs2.default.KEYS.ARROWS.RIGHT)) {
                    _this.acceleration.add(_this.acceleration_delta);
                } else if (_this.acceleration.x > 0) {
                    _this.acceleration.subtract(_this.acceleration_delta);

                    _this.acceleration.x = Math.max(0, _this.acceleration.x);
                }

                if (_this.speed.y < 0 && inputs.isKeyPressed(_inputs2.default.KEYS.ARROWS.UP)) {
                    _this.applyImpulse(new _point2.default(0, -JUMP_VARIATION));
                }
            });

            return _this;
        }

        return PlatformPlayer;
    })(_element2.default);

    PlatformPlayer.MAX_SPEED = 80;
    (0, _physics2.default)(PlatformPlayer);
    exports.default = PlatformPlayer;
});
//# sourceMappingURL=platform_player.js.map