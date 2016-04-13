function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/core/rectangle"], function (exports, _rectangle) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _rectangle2 = _interopRequireDefault(_rectangle);

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

    var Mask = (function (_Rectangle) {
        _inherits(Mask, _Rectangle);

        function Mask() {
            var width = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var height = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var position = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];
            var is_solid = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
            var stop_on_solids = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

            _classCallCheck(this, Mask);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Mask).call(this, width, height, position));

            _this.is_solid = is_solid;
            _this.stop_on_solids = stop_on_solids;
            return _this;
        }

        _createClass(Mask, [{
            key: "clone",
            value: function clone() {
                return new Mask(this.width, this.height, this.position, this.is_solid, this.stop_on_solids);
            }
        }], [{
            key: "createFromRectangle",
            value: function createFromRectangle(rectangle) {
                var is_solid = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
                var stop_on_solids = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
                return new Mask(rectangle.width, rectangle.height, undefined, is_solid, stop_on_solids);
            }
        }]);

        return Mask;
    })(_rectangle2.default);

    exports.default = Mask;
});
//# sourceMappingURL=mask.js.map