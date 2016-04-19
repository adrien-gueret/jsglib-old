function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/rpg/rpg_player", "jsglib/rpg/rpg_interactive", "jsglib/core/layer", "jsglib/core/sprite"], function (exports, _rpg_player, _rpg_interactive, _layer, _sprite) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Man = exports.ManSprite = undefined;

    var _rpg_player2 = _interopRequireDefault(_rpg_player);

    var _rpg_interactive2 = _interopRequireDefault(_rpg_interactive);

    var _layer2 = _interopRequireDefault(_layer);

    var _sprite2 = _interopRequireDefault(_sprite);

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

    var ManSprite = exports.ManSprite = (function (_Sprite) {
        _inherits(ManSprite, _Sprite);

        function ManSprite() {
            _classCallCheck(this, ManSprite);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(ManSprite).apply(this, arguments));
        }

        _createClass(ManSprite, null, [{
            key: "init",
            value: function init(timer) {
                this.makeTiles(26, 32, 1).defineTilesAnimations([{
                    name: 'walk_down',
                    tiles: [1, 2],
                    time: 250
                }, {
                    name: 'walk_left',
                    tiles: [5, 6],
                    time: 250
                }, {
                    name: 'walk_up',
                    tiles: [7, 8],
                    time: 250
                }, {
                    name: 'walk_right',
                    tiles: [3, 4],
                    time: 250
                }], timer);
            }
        }]);

        return ManSprite;
    })(_sprite2.default);

    var Man = exports.Man = (function (_RpgInteractive) {
        _inherits(Man, _RpgInteractive);

        function Man(x, y) {
            _classCallCheck(this, Man);

            // Add player to layer in order to display it

            var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Man).call(this, x, y));
            // We must call the parent's constructor

            _layer2.default.MAIN_LAYER.addElement(_this2);

            _this2.setSpriteClass(ManSprite);

            _this2.useAnimation('walk_down');

            _this2.on('rpg.interact', function (e) {
                switch (e.detail.direction) {
                    case _rpg_player2.default.DIRECTIONS.LEFT:
                        _this2.useAnimation('walk_left');
                        break;

                    case _rpg_player2.default.DIRECTIONS.RIGHT:
                        _this2.useAnimation('walk_right');
                        break;

                    case _rpg_player2.default.DIRECTIONS.UP:
                        _this2.useAnimation('walk_up');
                        break;

                    case _rpg_player2.default.DIRECTIONS.DOWN:
                        _this2.useAnimation('walk_down');
                        break;
                }
            });
            return _this2;
        }

        return Man;
    })(_rpg_interactive2.default);
});
//# sourceMappingURL=man.js.map