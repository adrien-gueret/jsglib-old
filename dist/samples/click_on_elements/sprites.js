function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/core/sprite"], function (exports, _sprite) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.SmallHeadsSprite = exports.BigHeadsSprite = exports.CHARACTERS_NUMBERS = undefined;

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

    var CHARACTERS_NUMBERS = exports.CHARACTERS_NUMBERS = {
        LUIGI: 1,
        MARIO: 2,
        YOSHI: 3,
        WARIO: 4,
        NONE: 5
    };

    var BigHeadsSprite = exports.BigHeadsSprite = (function (_Sprite) {
        _inherits(BigHeadsSprite, _Sprite);

        function BigHeadsSprite() {
            _classCallCheck(this, BigHeadsSprite);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(BigHeadsSprite).apply(this, arguments));
        }

        _createClass(BigHeadsSprite, null, [{
            key: "init",
            value: function init() {
                this.makeTiles(55, 60);
            }
        }]);

        return BigHeadsSprite;
    })(_sprite2.default);

    var SmallHeadsSprite = exports.SmallHeadsSprite = (function (_Sprite2) {
        _inherits(SmallHeadsSprite, _Sprite2);

        function SmallHeadsSprite() {
            _classCallCheck(this, SmallHeadsSprite);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(SmallHeadsSprite).apply(this, arguments));
        }

        _createClass(SmallHeadsSprite, null, [{
            key: "init",
            value: function init() {
                this.makeTiles(30, 32);
            }
        }]);

        return SmallHeadsSprite;
    })(_sprite2.default);
});
//# sourceMappingURL=sprites.js.map