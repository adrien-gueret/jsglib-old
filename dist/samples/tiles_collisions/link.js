function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/rpg/rpg_player", "jsglib/core/inputs", "jsglib/core/layer", "jsglib/core/sprite", "jsglib/core/point", "jsglib/core/mask"], function (exports, _rpg_player, _inputs, _layer, _sprite, _point, _mask) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Link = exports.LinkSprite = exports.LinkSpriteMask = undefined;

    var _rpg_player2 = _interopRequireDefault(_rpg_player);

    var _inputs2 = _interopRequireDefault(_inputs);

    var _layer2 = _interopRequireDefault(_layer);

    var _sprite2 = _interopRequireDefault(_sprite);

    var _point2 = _interopRequireDefault(_point);

    var _mask2 = _interopRequireDefault(_mask);

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

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

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

    var LinkSpriteMask = exports.LinkSpriteMask = (function (_Sprite) {
        _inherits(LinkSpriteMask, _Sprite);

        function LinkSpriteMask() {
            _classCallCheck(this, LinkSpriteMask);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(LinkSpriteMask).apply(this, arguments));
        }

        _createClass(LinkSpriteMask, null, [{
            key: "init",
            value: function init() {
                this.makeTiles(32, 32, 2);
            }
        }]);

        return LinkSpriteMask;
    })(_sprite2.default);

    var LinkSprite = exports.LinkSprite = (function (_LinkSpriteMask) {
        _inherits(LinkSprite, _LinkSpriteMask);

        function LinkSprite() {
            _classCallCheck(this, LinkSprite);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(LinkSprite).apply(this, arguments));
        }

        _createClass(LinkSprite, null, [{
            key: "init",
            value: function init(timer) {
                _get(Object.getPrototypeOf(LinkSprite), "init", this).call(this);

                this.defineTilesAnimations([{
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
                this.tiles.forEach(function (row) {
                    row.forEach(function (tile) {
                        tile.masks.push(new _mask2.default(16, 24, new _point2.default(8, 8), false, true));
                    });
                });
            }
        }]);

        return LinkSprite;
    })(LinkSpriteMask);

    var Link = exports.Link = (function (_RpgPlayer) {
        _inherits(Link, _RpgPlayer);

        function Link(x, y, inputs) {
            var _this3$initKeysMap;

            _classCallCheck(this, Link);

            // Tell which Sprite class to use for displaying

            var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Link).call(this, x, y, inputs));
            // We must call the parent's constructor

            _this3.setSpriteClass(LinkSprite);

            // RpgPlayer uses Trait_KeysMapping: we can bind keys to some actions
            // Here, we allow moving with arrows or ZQSD
            _this3.initKeysMap((_this3$initKeysMap = {}, _defineProperty(_this3$initKeysMap, _rpg_player2.default.ACTIONS.MOVE_LEFT, [_inputs2.default.KEYS.ARROWS.LEFT, _inputs2.default.KEYS.Q]), _defineProperty(_this3$initKeysMap, _rpg_player2.default.ACTIONS.MOVE_RIGHT, [_inputs2.default.KEYS.ARROWS.RIGHT, _inputs2.default.KEYS.D]), _defineProperty(_this3$initKeysMap, _rpg_player2.default.ACTIONS.MOVE_UP, [_inputs2.default.KEYS.ARROWS.UP, _inputs2.default.KEYS.Z]), _defineProperty(_this3$initKeysMap, _rpg_player2.default.ACTIONS.MOVE_DOWN, [_inputs2.default.KEYS.ARROWS.DOWN, _inputs2.default.KEYS.S]), _defineProperty(_this3$initKeysMap, _rpg_player2.default.ACTIONS.INTERACT, [_inputs2.default.KEYS.SPACE, _inputs2.default.KEYS.W]), _this3$initKeysMap));

            // == Events definitions ==
            _this3.on('rpg.solid_collision', function (e) {
                // We want to handle collision only on first collided solid found
                e.stopPropagation();

                // Use a "push" animation on solid collision
                switch (e.detail.direction) {
                    case _rpg_player2.default.DIRECTIONS.UP:
                        _this3.useAnimation('push_up');
                        break;

                    case _rpg_player2.default.DIRECTIONS.DOWN:
                        _this3.useAnimation('push_down');
                        break;

                    case _rpg_player2.default.DIRECTIONS.LEFT:
                        _this3.useAnimation('push_left');
                        break;

                    case _rpg_player2.default.DIRECTIONS.RIGHT:
                        _this3.useAnimation('push_right');
                        break;
                }
            }).on('no_solids_collision', function () {
                // When Link has no collisions with solids, if it's pushing,
                // change its "push" animation to the corresponding "walk" one
                switch (_this3.getAnimationName()) {
                    case 'push_left':
                        _this3.useAnimation('walk_left');
                        break;
                    case 'push_up':
                        _this3.useAnimation('walk_up');
                        break;
                    case 'push_right':
                        _this3.useAnimation('walk_right');
                        break;
                    case 'push_down':
                        _this3.useAnimation('walk_down');
                        break;
                }
            }).on('rpg.moving_key_up', function (e) {
                if (e.detail.pressed_moving_key) {
                    _this3.switchAnimationByKey(e.detail.pressed_moving_key);
                    return;
                }

                // No moving keys are pressed: we stop the animation
                _this3.switchAnimationByKey(e.detail.key);
                _this3.setCurrentTileNumber(_this3.current_animation.tiles_numbers[0]);
                _this3.current_animation.stop();
            });

            inputs.on('keydown', function (e) {
                // Do nothing if released key is not a moving one
                if (!_this3.isMovingKey(e.detail.key)) {
                    return;
                }

                // Update player animation if he's not pushing walls
                if (_this3.getAnimationName().indexOf('push') === -1) {
                    _this3.switchAnimationByKey(e.detail.key);
                }
            });

            // Add player to layer in order to display it
            _layer2.default.MAIN_LAYER.addElement(_this3);
            return _this3;
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

    Link.SPEED = 64;
});
//# sourceMappingURL=link.js.map