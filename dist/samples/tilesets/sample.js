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

    var MainTilesSprite = (function (_Sprite) {
        _inherits(MainTilesSprite, _Sprite);

        function MainTilesSprite() {
            _classCallCheck(this, MainTilesSprite);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(MainTilesSprite).apply(this, arguments));
        }

        _createClass(MainTilesSprite, null, [{
            key: "initTiles",
            value: function initTiles() {
                this.makeTiles(32, 32).defineTilesAnimations({
                    tiles: [6, 14],
                    time: 500
                });
                return this;
            }
        }]);

        return MainTilesSprite;
    })(_sprite2.default);

    var TilesPlainSprite = (function (_MainTilesSprite) {
        _inherits(TilesPlainSprite, _MainTilesSprite);

        function TilesPlainSprite() {
            _classCallCheck(this, TilesPlainSprite);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(TilesPlainSprite).apply(this, arguments));
        }

        return TilesPlainSprite;
    })(MainTilesSprite);

    var TilesSnowSprite = (function (_MainTilesSprite2) {
        _inherits(TilesSnowSprite, _MainTilesSprite2);

        function TilesSnowSprite() {
            _classCallCheck(this, TilesSnowSprite);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(TilesSnowSprite).apply(this, arguments));
        }

        return TilesSnowSprite;
    })(MainTilesSprite);

    var my_game = new _game2.default(document.getElementById('myGame'));
    my_game.registerClass(TilesPlainSprite);
    my_game.registerClass(TilesSnowSprite);
    var level1 = new _room2.default();
    Promise.all([TilesPlainSprite.loadImage('./tiles_plain.png'), TilesSnowSprite.loadImage('./tiles_snow.png')]).then(function () {
        TilesPlainSprite.initTiles();
        TilesSnowSprite.initTiles();
        return level1.useDefinition('./level.json');
    }).then(function () {
        my_game.goToRoom(level1).start();

        my_game.container.onclick = function () {
            var used_sprite = _layer2.default.TILES_LAYER.tiles_sprite;
            var new_sprite_class = used_sprite instanceof TilesPlainSprite ? TilesSnowSprite : TilesPlainSprite;
            _layer2.default.TILES_LAYER.tiles_sprite = new new_sprite_class();

            _layer2.default.TILES_LAYER.tiles.forEach(function (row) {
                row.forEach(function (tile) {
                    if (!tile.sprite_class) {
                        return;
                    }

                    tile.sprite_class = new_sprite_class;
                });
            });

            _layer2.default.TILES_LAYER.draw(my_game.timer, true);
        };
    });
});
//# sourceMappingURL=sample.js.map