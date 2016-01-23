function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["jsglib/game", "jsglib/sprite", "jsglib/room", "jsglib/layer"], function (_game, _sprite, _room, _layer) {
    "use strict";

    var _game2 = _interopRequireDefault(_game);

    var _sprite2 = _interopRequireDefault(_sprite);

    var _room2 = _interopRequireDefault(_room);

    var _layer2 = _interopRequireDefault(_layer);

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

    var my_game = new _game2.default(document.getElementById('myGame'));
    var level = new _room2.default();

    var TilesSprite = (function (_Sprite) {
        _inherits(TilesSprite, _Sprite);

        function TilesSprite() {
            _classCallCheck(this, TilesSprite);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(TilesSprite).apply(this, arguments));
        }

        return TilesSprite;
    })(_sprite2.default);

    TilesSprite.loadImage('./tiles.png').then(function () {
        TilesSprite.makeTiles(32, 32, 0);
        var TOTAL_COLUMNS = 15;
        var TOTAL_ROWS = 10;
        var tiles = [];

        for (var row_index = 0; row_index < TOTAL_ROWS; row_index++) {
            var row = [];

            for (var column_index = 0; column_index < TOTAL_COLUMNS; column_index++) {
                var min_tile_number = 2;
                var max_tile_number = 7;
                var delta = 1 + max_tile_number - min_tile_number;
                var random = Math.floor(delta * Math.random()) + min_tile_number;
                row.push(random);
            }

            tiles[row_index] = row;
        }

        return level.useDefinition({
            "layers": {
                "TILES_LAYER": {
                    "sprite_class": TilesSprite,
                    "tiles": tiles
                }
            }
        });
    }).then(function () {
        my_game.goToRoom(level).start().on('click', function (e) {
            var tile = _layer2.default.TILES_LAYER.getTileFromPoint(e.detail.mouse);

            if (!tile) {
                return;
            }

            if (tile.tile_number > 1) {
                tile.setTileNumber(tile.tile_number - 1);
            }
        });
    });
});
//# sourceMappingURL=sample.js.map