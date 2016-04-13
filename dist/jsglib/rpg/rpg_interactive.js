function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/core/element"], function (exports, _element) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _element2 = _interopRequireDefault(_element);

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

    var RpgInteractive = (function (_Element) {
        _inherits(RpgInteractive, _Element);

        function RpgInteractive(x, y) {
            _classCallCheck(this, RpgInteractive);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RpgInteractive).call(this, x, y));

            _this.is_solid = true;
            _this.stop_on_solids = true;
            return _this;
        }

        _createClass(RpgInteractive, [{
            key: "performInteraction",
            value: function performInteraction() {}
        }]);

        return RpgInteractive;
    })(_element2.default);

    exports.default = RpgInteractive;
});
//# sourceMappingURL=rpg_interactive.js.map