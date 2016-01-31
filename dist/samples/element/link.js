function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/element", "jsglib/inputs", "jsglib/layer", "jsglib/sprite"], function (exports, _element, _inputs, _layer, _sprite) {
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
                }], timer);
            }
        }]);

        return LinkSprite;
    })(_sprite2.default);

    var Link = exports.Link = (function (_Element) {
        _inherits(Link, _Element);

        function Link(x, y, game) {
            _classCallCheck(this, Link);

            var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Link).call(this, x, y));

            _this2.setSpriteClass(LinkSprite);

            game.inputs.on('keydown', function (e) {
                // Do nothing if pressed key is not an arrow
                if (!e.detail.is_arrow) {
                    return;
                }

                e.preventDefault();

                // Update Link's animation
                _this2.switchAnimationByKey(e.detail.key);
            }).on('keyup', function (e) {
                // Do nothing if released key is not an arrow
                if (!e.detail.is_arrow) {
                    return;
                }

                // Check if another arrow key is still pressed
                for (var key_name in _inputs2.default.KEYS.ARROWS) {
                    var key = _inputs2.default.KEYS.ARROWS[key_name];
                    if (game.inputs.isKeyPressed(key)) {
                        _this2.switchAnimationByKey(key);
                        return;
                    }
                }

                // No arrows keys are pressed: we stop the animation
                _this2.setCurrentTileNumber(_this2.current_animation.tiles_numbers[0]);
                _this2.current_animation.stop();
            });

            _this2.on('frame', function () {
                // On each frame, move player according to pressed keys
                if (game.inputs.isKeyPressed(_inputs2.default.KEYS.ARROWS.LEFT)) {
                    _this2.position.x -= 3;
                }

                if (game.inputs.isKeyPressed(_inputs2.default.KEYS.ARROWS.RIGHT)) {
                    _this2.position.x += 3;
                }

                if (game.inputs.isKeyPressed(_inputs2.default.KEYS.ARROWS.UP)) {
                    _this2.position.y -= 3;
                }

                if (game.inputs.isKeyPressed(_inputs2.default.KEYS.ARROWS.DOWN)) {
                    _this2.position.y += 3;
                }
            });

            // Add player to layer in order to display it
            _layer2.default.MAIN_LAYER.addElement(_this2);
            return _this2;
        }

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