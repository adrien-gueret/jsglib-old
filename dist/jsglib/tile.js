function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/events_handler", "jsglib/point"], function (exports, _events_handler, _point) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _events_handler2 = _interopRequireDefault(_events_handler);

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

    var Tile = (function (_EventsHandler) {
        _inherits(Tile, _EventsHandler);

        function Tile(sprite_class) {
            var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

            _classCallCheck(this, Tile);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tile).call(this));

            _this.sprite_class = sprite_class;
            _this.position = new _point2.default(x, y);
            _this.needs_redraw = true;
            _this.clock_animation = null;
            return _this;
        }

        _createClass(Tile, [{
            key: "clone",
            value: function clone() {
                var new_tile = new Tile(this.sprite_class, this.position.x, this.position.y);

                if (this.animation) {
                    var _animation = this.animation;
                    var next_tile_number = _animation.next_tile_number;
                    var time = _animation.time;
                    new_tile.animation = {
                        next_tile_number: next_tile_number,
                        time: time
                    };
                }

                return new_tile;
            }
        }, {
            key: "draw",
            value: function draw(ctx) {
                var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

                var _this2 = this;

                var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
                var timer = arguments[3];
                var tiles_size = {
                    width: this.sprite_class.tiles_width,
                    height: this.sprite_class.tiles_height
                };
                var dest_x = x * tiles_size.height;
                var dest_y = y * tiles_size.width;
                ctx.clearRect(dest_x, dest_y, tiles_size.width, tiles_size.height);
                ctx.drawImage(this.sprite_class.image, this.position.x, this.position.y, tiles_size.width, tiles_size.height, dest_x, dest_y, tiles_size.width, tiles_size.height);
                this.needs_redraw = false;

                if (this.animation) {
                    if (this.clock_animation) {
                        timer.clearTimeout(this.clock_animation);
                    }

                    this.clock_animation = timer.setTimeout(function () {
                        _this2.trigger('animation');
                    }, this.animation.time);
                }

                return this;
            }
        }, {
            key: "setAnimation",
            value: function setAnimation(next_tile_number, time) {
                this.animation = {
                    next_tile_number: next_tile_number,
                    time: time
                };
                return this;
            }
        }]);

        return Tile;
    })(_events_handler2.default);

    exports.default = Tile;
});
//# sourceMappingURL=tile.js.map