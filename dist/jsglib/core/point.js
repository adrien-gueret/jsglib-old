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
            this.x_min = NaN;
            this.y_min = NaN;
            this.x_max = NaN;
            this.y_max = NaN;
        }

        _createClass(Point, [{
            key: "set",
            value: function set(x) {
                var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];
                this.x = x;
                this.y = y;

                if (!isNaN(this.x_min)) {
                    this.x = Math.max(this.x, this.x_min);
                }

                if (!isNaN(this.x_max)) {
                    this.x = Math.min(this.x, this.x_max);
                }

                if (!isNaN(this.y_min)) {
                    this.y = Math.max(this.y, this.y_min);
                }

                if (!isNaN(this.y_max)) {
                    this.y = Math.min(this.y, this.y_max);
                }

                return this;
            }
        }, {
            key: "$set",
            value: function $set(x, y, new_point) {
                if (new_point) {
                    return this.clone().set(x, y);
                }

                return this.set(x, y);
            }
        }, {
            key: "copy",
            value: function copy(point) {
                return this.set(point.x, point.y);
            }
        }, {
            key: "clone",
            value: function clone() {
                return new Point(this.x, this.y).minimum(this.x_min, this.y_min, false).maximum(this.x_max, this.y_max, false);
            }
        }, {
            key: "equals",
            value: function equals(point) {
                return this.x === point.x && this.y === point.y;
            }
        }, {
            key: "add",
            value: function add(point) {
                var new_point = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
                var new_x = this.x + point.x;
                var new_y = this.y + point.y;
                return this.$set(new_x, new_y, new_point);
            }
        }, {
            key: "subtract",
            value: function subtract(point) {
                var new_point = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
                var new_x = this.x - point.x;
                var new_y = this.y - point.y;
                return this.$set(new_x, new_y, new_point);
            }
        }, {
            key: "multiply",
            value: function multiply(point) {
                var new_point = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
                var new_x = this.x * point.x;
                var new_y = this.y * point.y;
                return this.$set(new_x, new_y, new_point);
            }
        }, {
            key: "divide",
            value: function divide(point) {
                var new_point = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
                var new_x = this.x / point.x;
                var new_y = this.y / point.y;
                return this.$set(new_x, new_y, new_point);
            }
        }, {
            key: "abs",
            value: function abs() {
                var new_point = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
                var new_x = Math.abs(this.x);
                var new_y = Math.abs(this.y);
                return this.$set(new_x, new_y, new_point);
            }
        }, {
            key: "round",
            value: function round() {
                var new_point = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
                var new_x = this.x + (this.x < 0 ? -.5 : .5);
                var new_y = this.y + (this.y < 0 ? -.5 : .5);
                return this.$set(new_x | 0, new_y | 0, new_point);
            }
        }, {
            key: "minimum",
            value: function minimum(x) {
                var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];
                var new_point = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
                var point = new_point ? this.clone() : this;
                point.x_min = x;
                point.y_min = y;
                return this.set(this.x, this.y);
            }
        }, {
            key: "maximum",
            value: function maximum(x) {
                var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];
                var new_point = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
                var point = new_point ? this.clone() : this;
                point.x_max = x;
                point.y_max = y;
                return this.set(this.x, this.y);
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
        }, {
            key: "getDistanceFromPoint",
            value: function getDistanceFromPoint(point) {
                var delta = this.subtract(point, true).abs();
                delta.multiply(delta);
                return Math.sqrt(delta.x + delta.y);
            }
        }]);

        return Point;
    })();

    exports.default = Point;
});
//# sourceMappingURL=point.js.map