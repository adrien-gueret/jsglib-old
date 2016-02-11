define(["exports", "jsglib/point"], function (exports, _point) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _point2 = _interopRequireDefault(_point);

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

    var Rectangle = (function () {
        function Rectangle() {
            var width = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var height = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var position = arguments[2];

            _classCallCheck(this, Rectangle);

            this.width = width;
            this.height = height;
            this.position = position ? position.clone() : new _point2.default();
        }

        _createClass(Rectangle, [{
            key: "getCenter",
            value: function getCenter() {
                return new _point2.default(this.position.x + this.width / 2, this.position.y + this.height / 2);
            }
        }, {
            key: "isCollidedWithRectangle",
            value: function isCollidedWithRectangle(rectangle) {
                return !(rectangle.position.x >= this.position.x + this.width || rectangle.position.x + rectangle.width <= this.position.x || rectangle.position.y >= this.position.y + this.height || rectangle.position.y + rectangle.height <= this.position.y);
            }
        }, {
            key: "containsRectangle",
            value: function containsRectangle(rectangle) {
                return rectangle.position.x > this.position.x && rectangle.position.y > this.position.y && rectangle.position.x + rectangle.width < this.position.x + this.width && rectangle.position.y + rectangle.height < this.position.y + this.height;
            }
        }]);

        return Rectangle;
    })();

    exports.default = Rectangle;
});
//# sourceMappingURL=rectangle.js.map