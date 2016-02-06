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
            var tile_number = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
            var type = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

            _classCallCheck(this, Tile);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tile).call(this));

            _this.sprite_class = sprite_class;
            _this.sheet_position = new _point2.default(x, y);
            _this.tile_number = tile_number;
            _this.needs_redraw = true;
            _this.is_empty = false;
            _this.type = type;
            return _this;
        }

        _createClass(Tile, [{
            key: "getSize",
            value: function getSize() {
                return this.sprite_class.getTilesSize();
            }
        }, {
            key: "clone",
            value: function clone() {
                return new Tile(this.sprite_class, this.sheet_position.x, this.sheet_position.y, this.tile_number, this.type);
            }
        }, {
            key: "setTileNumber",
            value: function setTileNumber(tile_number) {
                var tile = this.sprite_class.getTile(tile_number);
                this.is_empty = tile.is_empty;
                this.tile_number = tile_number;
                this.sheet_position = tile.sheet_position;
                this.type = tile.type;
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
                return this.type === Tile.TYPES.SOLID;
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
    })(_events_handler2.default);

    Tile.TYPES = {
        SOLID: Symbol()
    };
    exports.default = Tile;
});
//# sourceMappingURL=tile.js.map