function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/core/element", "jsglib/core/inputs", "jsglib/core/layer", "jsglib/core/sprite"], function (exports, _element, _inputs, _layer, _sprite) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Link = exports.LinkSprite = undefined;

    var _element2 = _interopRequireDefault(_element);

    var _inputs2 = _interopRequireDefault(_inputs);

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
                    name: 'walk_bottom',
                    tiles: [1, 2],
                    time: 150
                }, {
                    name: 'walk_left',
                    tiles: [3, 4],
                    time: 150
                }, {
                    name: 'walk_top',
                    tiles: [5, 6],
                    time: 150
                }, {
                    name: 'walk_right',
                    tiles: [7, 8],
                    time: 150
                }, {
                    name: 'push_bottom',
                    tiles: [9, 10],
                    time: 150
                }, {
                    name: 'push_left',
                    tiles: [11, 12],
                    time: 150
                }, {
                    name: 'push_top',
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

    var LINK_SPEED = 70;

    var Link = exports.Link = (function (_Element) {
        _inherits(Link, _Element);

        function Link(x, y, game) {
            _classCallCheck(this, Link);

            // Tell which Sprite class to use for displaying

            var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Link).call(this, x, y));
            // We must call the parent's constructor

            _this2.setSpriteClass(LinkSprite);

            // Tell that this instance must not move on solids
            _this2.stop_on_solids = true;

            // Attach keyboards events
            game.inputs.on('keydown', function (e) {
                // Do nothing if pressed key is not an arrow
                if (!e.detail.is_arrow) {
                    return;
                }

                e.preventDefault();

                // Update Link's animation if he's not pushing walls
                if (_this2.getAnimationName().indexOf('push') === -1) {
                    _this2.switchAnimationByKey(e.detail.key);
                }
            }).on('keyup', function (e) {
                // Do nothing if released key is not an arrow
                if (!e.detail.is_arrow) {
                    return;
                }

                // Check if another arrow key is still pressed
                var pressed_arrows = game.inputs.getPressedArrows();

                if (pressed_arrows.length) {
                    return _this2.switchAnimationByKey(pressed_arrows[0]);
                }

                // No arrows keys are pressed: we stop the animation
                _this2.switchAnimationByKey(e.detail.key);
                _this2.setCurrentTileNumber(_this2.current_animation.tiles_numbers[0]);
                _this2.current_animation.stop();
            });

            // Other specific events related to this current instance
            _this2.on('frame', function () {
                // On each frame, update instance's speeds according to pressed keys
                if (game.inputs.isKeyPressed(_inputs2.default.KEYS.ARROWS.LEFT)) {
                    _this2.speed.x = -LINK_SPEED;
                } else if (game.inputs.isKeyPressed(_inputs2.default.KEYS.ARROWS.RIGHT)) {
                    _this2.speed.x = LINK_SPEED;
                } else {
                    _this2.speed.x = 0;
                }

                if (game.inputs.isKeyPressed(_inputs2.default.KEYS.ARROWS.UP)) {
                    _this2.speed.y = -LINK_SPEED;
                } else if (game.inputs.isKeyPressed(_inputs2.default.KEYS.ARROWS.DOWN)) {
                    _this2.speed.y = LINK_SPEED;
                } else {
                    _this2.speed.y = 0;
                }
            }).on('tile_collision', function (e) {
                // On collision with solids, use "push" animation according to collided tile position
                if (e.detail.tile_data.tile.isSolid()) {
                    var this_size = _this2.getSize();
                    var tile_size = e.detail.tile_data.tile.getSize();
                    var tile_position = e.detail.tile_data.position;

                    if (tile_position.y + tile_size.height <= _this2.position.y) {
                        _this2.useAnimation('push_top');
                        e.stopPropagation();
                    } else if (_this2.position.y + this_size.height <= tile_position.y) {
                        _this2.useAnimation('push_bottom');
                        e.stopPropagation();
                    } else if (tile_position.x + tile_size.width <= _this2.position.x) {
                        _this2.useAnimation('push_left');
                        e.stopPropagation();
                    } else if (_this2.position.x + this_size.width <= tile_position.x) {
                        _this2.useAnimation('push_right');
                        e.stopPropagation();
                    }
                }
            }).on('no_solids_collision', function () {
                // When the instance has no collisions with solids, if it's pushing,
                // change its "push" animation to the corresponding "walk" one
                switch (_this2.getAnimationName()) {
                    case 'push_left':
                        _this2.useAnimation('walk_left');
                        break;
                    case 'push_top':
                        _this2.useAnimation('walk_top');
                        break;
                    case 'push_right':
                        _this2.useAnimation('walk_right');
                        break;
                    case 'push_bottom':
                        _this2.useAnimation('walk_bottom');
                        break;
                }
            });

            // Add player to layer in order to display it
            _layer2.default.MAIN_LAYER.addElement(_this2);
            return _this2;
        }

        // Custom method for this class: it updates Link's animation according to pressed arrow key

        _createClass(Link, [{
            key: "switchAnimationByKey",
            value: function switchAnimationByKey(key) {
                switch (key) {
                    case _inputs2.default.KEYS.ARROWS.LEFT:
                        this.useAnimation('walk_left');
                        break;

                    case _inputs2.default.KEYS.ARROWS.UP:
                        this.useAnimation('walk_top');
                        break;

                    case _inputs2.default.KEYS.ARROWS.RIGHT:
                        this.useAnimation('walk_right');
                        break;

                    case _inputs2.default.KEYS.ARROWS.DOWN:
                        this.useAnimation('walk_bottom');
                        break;
                }

                return this;
            }
        }]);

        return Link;
    })(_element2.default);
});
//# sourceMappingURL=link.js.map