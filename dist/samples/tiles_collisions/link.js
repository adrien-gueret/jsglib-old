function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/rpg/rpg_core", "jsglib/rpg/rpg_player", "jsglib/core/inputs", "jsglib/core/layer", "jsglib/core/sprite"], function (exports, _rpg_core, _rpg_player, _inputs, _layer, _sprite) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Link = exports.LinkSprite = undefined;

    var _rpg_player2 = _interopRequireDefault(_rpg_player);

    var _inputs2 = _interopRequireDefault(_inputs);

    var _layer2 = _interopRequireDefault(_layer);

    var _sprite2 = _interopRequireDefault(_sprite);

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

    var LinkSprite = exports.LinkSprite = (function (_Sprite) {
        _inherits(LinkSprite, _Sprite);

        function LinkSprite() {
            _classCallCheck(this, LinkSprite);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(LinkSprite).apply(this, arguments));
        }

        _createClass(LinkSprite, null, [{
            key: "init",
            value: function init(timer) {
                this.makeTiles(32, 32, 2).defineTilesAnimations([{
                    name: 'walk_down',
                    tiles: [1, 2],
                    time: 150
                }, {
                    name: 'walk_left',
                    tiles: [3, 4],
                    time: 150
                }, {
                    name: 'walk_up',
                    tiles: [5, 6],
                    time: 150
                }, {
                    name: 'walk_right',
                    tiles: [7, 8],
                    time: 150
                }, {
                    name: 'push_down',
                    tiles: [9, 10],
                    time: 150
                }, {
                    name: 'push_left',
                    tiles: [11, 12],
                    time: 150
                }, {
                    name: 'push_up',
                    tiles: [13, 14],
                    time: 150
                }, {
                    name: 'push_right',
                    tiles: [15, 16],
                    time: 150
                }], timer);
            }
        }]);

        return LinkSprite;
    })(_sprite2.default);

    var Link = exports.Link = (function (_RpgPlayer) {
        _inherits(Link, _RpgPlayer);

        function Link(x, y, game) {
            var _this2$initKeysMap;

            _classCallCheck(this, Link);

            // Tell which Sprite class to use for displaying

            var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Link).call(this, x, y, game.inputs));
            // We must call the parent's constructor

            _this2.setSpriteClass(LinkSprite);

            // RpgPlayer uses Trait_KeysMapping: we can bind keys to some actions
            // Here, we allow moving with arrows or ZQSD
            _this2.initKeysMap((_this2$initKeysMap = {}, _defineProperty(_this2$initKeysMap, _rpg_player2.default.ACTIONS.MOVE_LEFT, [_inputs2.default.KEYS.ARROWS.LEFT, _inputs2.default.KEYS.Q]), _defineProperty(_this2$initKeysMap, _rpg_player2.default.ACTIONS.MOVE_RIGHT, [_inputs2.default.KEYS.ARROWS.RIGHT, _inputs2.default.KEYS.D]), _defineProperty(_this2$initKeysMap, _rpg_player2.default.ACTIONS.MOVE_UP, [_inputs2.default.KEYS.ARROWS.UP, _inputs2.default.KEYS.Z]), _defineProperty(_this2$initKeysMap, _rpg_player2.default.ACTIONS.MOVE_DOWN, [_inputs2.default.KEYS.ARROWS.DOWN, _inputs2.default.KEYS.S]), _this2$initKeysMap));

            // == Events definitions ==
            _this2.on('rpg.solid_collision', function (e) {
                // We want to handle collision only on first collided solid found
                e.stopPropagation();

                // Use a "push" animation on solid collision
                switch (e.detail.direction) {
                    case _rpg_core.DIRECTIONS.UP:
                        _this2.useAnimation('push_up');
                        break;

                    case _rpg_core.DIRECTIONS.DOWN:
                        _this2.useAnimation('push_down');
                        break;

                    case _rpg_core.DIRECTIONS.LEFT:
                        _this2.useAnimation('push_left');
                        break;

                    case _rpg_core.DIRECTIONS.RIGHT:
                        _this2.useAnimation('push_right');
                        break;
                }
            }).on('no_solids_collision', function () {
                // When Link has no collisions with solids, if it's pushing,
                // change its "push" animation to the corresponding "walk" one
                switch (_this2.getAnimationName()) {
                    case 'push_left':
                        _this2.useAnimation('walk_left');
                        break;
                    case 'push_up':
                        _this2.useAnimation('walk_up');
                        break;
                    case 'push_right':
                        _this2.useAnimation('walk_right');
                        break;
                    case 'push_down':
                        _this2.useAnimation('walk_down');
                        break;
                }
            }).on('rpg.moving_key_up', function (e) {
                if (e.detail.pressed_moving_key) {
                    _this2.switchAnimationByKey(e.detail.pressed_moving_key);
                    return;
                }

                // No moving keys are pressed: we stop the animation
                _this2.switchAnimationByKey(e.detail.key);
                _this2.setCurrentTileNumber(_this2.current_animation.tiles_numbers[0]);
                _this2.current_animation.stop();
            });

            game.inputs.on('keydown', function (e) {
                // Do nothing if released key is not a moving one
                if (!_this2.isMovingKey(e.detail.key)) {
                    return;
                }

                // Update player animation if he's not pushing walls
                if (_this2.getAnimationName().indexOf('push') === -1) {
                    _this2.switchAnimationByKey(e.detail.key);
                }
            });

            // Add player to layer in order to display it
            _layer2.default.MAIN_LAYER.addElement(_this2);
            return _this2;
        }

        // Custom method for this class: it updates Link's animation according to pressed moving key

        _createClass(Link, [{
            key: "switchAnimationByKey",
            value: function switchAnimationByKey(key) {
                if (this.isKeyBindedToAction(key, _rpg_player2.default.ACTIONS.MOVE_LEFT)) {
                    this.useAnimation('walk_left');
                } else if (this.isKeyBindedToAction(key, _rpg_player2.default.ACTIONS.MOVE_UP)) {
                    this.useAnimation('walk_up');
                } else if (this.isKeyBindedToAction(key, _rpg_player2.default.ACTIONS.MOVE_RIGHT)) {
                    this.useAnimation('walk_right');
                } else if (this.isKeyBindedToAction(key, _rpg_player2.default.ACTIONS.MOVE_DOWN)) {
                    this.useAnimation('walk_down');
                }

                return this;
            }
        }]);

        return Link;
    })(_rpg_player2.default);

    Link.SPEED = 80;
});
//# sourceMappingURL=link.js.map