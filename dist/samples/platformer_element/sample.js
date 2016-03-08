function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["jsglib/core/game", "jsglib/core/room", "jsglib/core/sprite", "jsglib/core/tile", "jsglib/core/point", "./ball", "./star"], function (_game, _room, _sprite, _tile, _point, _ball, _star) {
    "use strict";

    var _game2 = _interopRequireDefault(_game);

    var _room2 = _interopRequireDefault(_room);

    var _sprite2 = _interopRequireDefault(_sprite);

    var _tile2 = _interopRequireDefault(_tile);

    var _point2 = _interopRequireDefault(_point);

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

    var TilesSprite = (function (_Sprite) {
        _inherits(TilesSprite, _Sprite);

        function TilesSprite() {
            _classCallCheck(this, TilesSprite);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(TilesSprite).apply(this, arguments));
        }

        return TilesSprite;
    })(_sprite2.default);

    var my_game = new _game2.default(document.getElementById('myGame'));
    Promise.all([_ball.BallSprite.loadImage('./ball.png'), TilesSprite.loadImage('./tiles.png'), _star.StarSprite.loadImage('./star.png')]).then(function () {
        TilesSprite.makeTiles(32, 32, 1).defineTilesTypes(_defineProperty({}, _tile2.default.TYPES.SOLID, new Array(13).fill(0).map(function (value, index) {
            return index + 1;
        }))).defineTilesSlopes({
            16: new _point2.default(16, 0),
            18: new _point2.default(31, 16)
        });

        _star.StarSprite.makeTiles(34, 33, 0).defineTilesAnimations([{
            name: 'main',
            tiles: [1, 2, 3, 4, 5]
        }], my_game.timer);

        var level = new _room2.default();
        level.useDefinition({
            layers: {
                TILES_LAYER: {
                    sprite_class: TilesSprite,
                    tiles: [[4, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 5], [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 0, 6], [8, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6], [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 16, 2, 2, 2, 2, 10], [9, 2, 3, 0, 0, 0, 14, 15, 0, 18, 16, 17, 7, 7, 7, 7, 7, 7], [7, 7, 8, 0, 0, 0, 0, 1, 2, 17, 7, 7, 7, 7, 7, 7, 7, 7], [7, 7, 8, 0, 0, 0, 0, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7], [7, 7, 9, 2, 2, 2, 2, 10, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]],
                    elements: [{
                        class_name: _ball.Ball
                    }, {
                        class_name: _star.Star,
                        position: [120, 32]
                    }]
                }
            }
        });
        my_game.goToRoom(level).start();
    });
});
//# sourceMappingURL=sample.js.map