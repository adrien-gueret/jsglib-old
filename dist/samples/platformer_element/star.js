function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/core/element", "jsglib/core/layer", "jsglib/core/sprite"], function (exports, _element, _layer, _sprite) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Star = exports.StarSprite = undefined;

    var _element2 = _interopRequireDefault(_element);

    var _layer2 = _interopRequireDefault(_layer);

    var _sprite2 = _interopRequireDefault(_sprite);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
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

    var StarSprite = exports.StarSprite = (function (_Sprite) {
        _inherits(StarSprite, _Sprite);

        function StarSprite() {
            _classCallCheck(this, StarSprite);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(StarSprite).apply(this, arguments));
        }

        return StarSprite;
    })(_sprite2.default);

    var Star = exports.Star = (function (_Element) {
        _inherits(Star, _Element);

        function Star(x, y) {
            _classCallCheck(this, Star);

            // Indicate the sprite class to use

            var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Star).call(this, x, y));
            // We must call the parent's constructor

            _this2.setSpriteClass(StarSprite);

            // Add player to layer in order to display it
            _layer2.default.MAIN_LAYER.addElement(_this2);

            _this2.setUpAnimation();
            return _this2;
        }

        _createClass(Star, [{
            key: "setUpAnimation",
            value: function setUpAnimation() {
                var _this3 = this;

                this.useAnimation('main', 100, false);
                this.current_animation.on('animation_end', function () {
                    _this3.current_animation.timer.setTimeout(function () {
                        return _this3.setUpAnimation();
                    }, 1000);
                });
            }
        }]);

        return Star;
    })(_element2.default);
});
//# sourceMappingURL=star.js.map