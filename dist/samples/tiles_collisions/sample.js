function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["jsglib/core/game", "jsglib/core/room", "jsglib/core/sprite", "jsglib/core/tile", "./link", "./man"], function (_game, _room, _sprite, _tile, _link, _man) {
    "use strict";

    var _game2 = _interopRequireDefault(_game);

    var _room2 = _interopRequireDefault(_room);

    var _sprite2 = _interopRequireDefault(_sprite);

    var _tile2 = _interopRequireDefault(_tile);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
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

    var HouseSpriteSheets = (function (_Sprite) {
        _inherits(HouseSpriteSheets, _Sprite);

        function HouseSpriteSheets() {
            _classCallCheck(this, HouseSpriteSheets);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(HouseSpriteSheets).apply(this, arguments));
        }

        return HouseSpriteSheets;
    })(_sprite2.default);

    var my_game = new _game2.default(document.getElementById('myGame'));
    Promise.all([_link.LinkSprite.loadImage('./link.png'), _link.LinkSpriteMask.loadImage('./link_mask.png'), _man.ManSprite.loadImage('./man.png'), HouseSpriteSheets.loadImage('./house_tiles.png')]).then(function () {
        _link.LinkSpriteMask.init();

        _link.LinkSprite.init(my_game.timer);

        _man.ManSprite.init(my_game.timer);

        HouseSpriteSheets.makeTiles(32, 32, 1).defineTilesTypes(_defineProperty({}, _tile2.default.TYPES.SOLID, [2, 4, 5, 6, 8, 10, 12, 14, 14, 15, 17, 18, 19]));
        var level = new _room2.default();
        level.useDefinition({
            layers: {
                TILES_LAYER: {
                    sprite_class: HouseSpriteSheets,
                    tiles: [[1, 4, 4, 4, 4, 4, 4, 4, 4, 3], [6, 9, 9, 9, 9, 9, 9, 9, 9, 8], [6, 7, 7, 16, 16, 16, 16, 7, 7, 8], [6, 4, 7, 16, 17, 19, 16, 7, 4, 8], [6, 9, 7, 16, 16, 16, 16, 7, 9, 8], [6, 7, 7, 7, 7, 7, 7, 15, 5, 8], [6, 14, 7, 7, 7, 7, 7, 7, 10, 8], [11, 12, 12, 12, 12, 12, 12, 12, 12, 13]]
                }
            }
        });
        level.on('start', function () {
            new _man.Man(96, 96);
            new _link.Link(128, 160, my_game.inputs);
        });
        my_game.goToRoom(level).start();
    });
});
//# sourceMappingURL=sample.js.map