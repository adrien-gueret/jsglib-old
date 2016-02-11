define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

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

    var Point = (function () {
        function Point() {
            var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            _classCallCheck(this, Point);

            this.x = x;
            this.y = y;
        }

        _createClass(Point, [{
            key: "set",
            value: function set(x) {
                var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];
                this.constructor(x, y);
                return this;
            }
        }, {
            key: "copy",
            value: function copy(point) {
                this.constructor(point.x, point.y);
                return this;
            }
        }, {
            key: "clone",
            value: function clone() {
                return new Point(this.x, this.y);
            }
        }, {
            key: "equals",
            value: function equals(point) {
                return this.x === point.x && this.y === point.y;
            }
        }, {
            key: "add",
            value: function add(point) {
                var new_point = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

                if (new_point) {
                    return new Point(this.x + point.x, this.y + point.y);
                }

                this.x += point.x;
                this.y += point.y;
                return this;
            }
        }, {
            key: "substract",
            value: function substract(point) {
                var new_point = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

                if (new_point) {
                    return new Point(this.x - point.x, this.y - point.y);
                }

                this.x -= point.x;
                this.y -= point.y;
                return this;
            }
        }, {
            key: "multiply",
            value: function multiply(point) {
                var new_point = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

                if (new_point) {
                    return new Point(this.x * point.x, this.y * point.y);
                }

                this.x *= point.x;
                this.y *= point.y;
                return this;
            }
        }, {
            key: "isInRectangle",
            value: function isInRectangle(rectangle) {
                return this.x >= rectangle.position.x && this.x < rectangle.position.x + rectangle.width && this.y >= rectangle.position.y && this.y < rectangle.position.y + rectangle.height;
            }
        }, {
            key: "isOverElement",
            value: function isOverElement(element) {
                return this.isInRectangle(element.getRectangle());
            }
        }]);

        return Point;
    })();

    exports.default = Point;
});
//# sourceMappingURL=point.js.map