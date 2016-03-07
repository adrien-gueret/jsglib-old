define(["exports", "jsglib/core/point", "jsglib/traits/events_handler"], function (exports, _point, _events_handler) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _point2 = _interopRequireDefault(_point);

    var _events_handler2 = _interopRequireDefault(_events_handler);

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

    var Tile = (function () {
        function Tile(sprite_class) {
            var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
            var tile_number = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
            var type = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
            var slope_point = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];

            _classCallCheck(this, Tile);

            this.sprite_class = sprite_class;
            this.sheet_position = new _point2.default(x, y);
            this.tile_number = tile_number;
            this.needs_redraw = true;
            this.is_empty = false;
            this.type = type;
            this.slope_point = slope_point;
        }

        _createClass(Tile, [{
            key: "getSize",
            value: function getSize() {
                return this.sprite_class.getTilesSize();
            }
        }, {
            key: "clone",
            value: function clone() {
                return new Tile(this.sprite_class, this.sheet_position.x, this.sheet_position.y, this.tile_number, this.type, this.slope_point);
            }
        }, {
            key: "setTileNumber",
            value: function setTileNumber(tile_number) {
                var tile = this.sprite_class.getTile(tile_number);
                this.is_empty = tile.is_empty;
                this.tile_number = tile_number;
                this.sheet_position = tile.sheet_position;
                this.type = tile.type;
                this.slope_point = tile.slope_point;
                this.needs_redraw = true;
                return this;
            }
        }, {
            key: "draw",
            value: function draw(ctx) {
                var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
                var tiles_size = {
                    width: this.sprite_class.tiles_width,
                    height: this.sprite_class.tiles_height
                };
                ctx.drawImage(this.sprite_class.image, this.sheet_position.x, this.sheet_position.y, tiles_size.width, tiles_size.height, x, y, tiles_size.width, tiles_size.height);
                this.trigger('drawn');
                return this;
            }
        }, {
            key: "clear",
            value: function clear(ctx, x, y) {
                var tiles_size = {
                    width: this.sprite_class.tiles_width,
                    height: this.sprite_class.tiles_height
                };
                ctx.clearRect(x, y, tiles_size.width, tiles_size.height);
                return this;
            }
        }, {
            key: "isSolid",
            value: function isSolid() {
                return this.type === Tile.TYPES.SOLID || this.isSlope();
            }
        }, {
            key: "isSlope",
            value: function isSlope() {
                return this.slope_point !== null;
            }
        }, {
            key: "getContactY",
            value: function getContactY(x, tile_position) {
                var x_on_tile = this.getXOnTile(x, tile_position.x);
                var y_on_tile = this.getYFromSlope(x_on_tile);

                if (isNaN(y_on_tile)) {
                    return NaN;
                }

                return tile_position.y + y_on_tile;
            }
        }, {
            key: "getXOnTile",
            value: function getXOnTile(target_x, tile_x) {
                return (target_x - tile_x) / this.getSize().width;
            }
        }, {
            key: "getYFromSlope",
            value: function getYFromSlope(x_on_tile) {
                if (!this.isSlope()) {
                    return 0;
                }

                if (x_on_tile < 0 || x_on_tile > 1) {
                    return NaN;
                }

                return (1 - x_on_tile) * this.slope_point.x + x_on_tile * this.slope_point.y;
            }
        }], [{
            key: "getNewEmptyTile",
            value: function getNewEmptyTile(sprite_class) {
                var tile = new Tile(sprite_class);
                tile.is_empty = true;
                return tile;
            }
        }]);

        return Tile;
    })();

    Tile.TYPES = {
        SOLID: Symbol(),
        SLOPE: Symbol()
    };
    (0, _events_handler2.default)(Tile);
    exports.default = Tile;
});
//# sourceMappingURL=tile.js.map