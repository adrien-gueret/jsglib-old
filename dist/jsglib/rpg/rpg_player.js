function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/core/element", "jsglib/core/point", "jsglib/core/inputs", "jsglib/rpg/rpg_interactive", "jsglib/traits/keys_mapping"], function (exports, _element, _point, _inputs, _rpg_interactive, _keys_mapping) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _element2 = _interopRequireDefault(_element);

    var _point2 = _interopRequireDefault(_point);

    var _inputs2 = _interopRequireDefault(_inputs);

    var _rpg_interactive2 = _interopRequireDefault(_rpg_interactive);

    var _keys_mapping2 = _interopRequireDefault(_keys_mapping);

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

    var RpgPlayer = (function (_Element) {
        _inherits(RpgPlayer, _Element);

        function RpgPlayer(x, y, inputs) {
            _classCallCheck(this, RpgPlayer);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RpgPlayer).call(this, x, y));

            var SPEED = _this.constructor.SPEED || RpgPlayer.SPEED;
            _this.stop_on_solids = true;
            inputs.on('keyup', function (e) {
                if (!_this.isMovingKey(e.detail.key)) {
                    return;
                }

                var pressed_moving_keys = inputs.keys_pressed.filter(function (key) {
                    return _this.isMovingKey(key);
                });

                _this.trigger('rpg.moving_key_up', {
                    key: e.detail.key,
                    pressed_moving_key: pressed_moving_keys[0] || null
                });
            });

            _this.on('frame', function () {
                if (_this.isActionKeyPressed(inputs, RpgPlayer.ACTIONS.MOVE_LEFT)) {
                    _this.speed.x = -SPEED;
                } else if (_this.isActionKeyPressed(inputs, RpgPlayer.ACTIONS.MOVE_RIGHT)) {
                    _this.speed.x = SPEED;
                } else {
                    _this.speed.x = 0;
                }

                if (_this.isActionKeyPressed(inputs, RpgPlayer.ACTIONS.MOVE_UP)) {
                    _this.speed.y = -SPEED;
                } else if (_this.isActionKeyPressed(inputs, RpgPlayer.ACTIONS.MOVE_DOWN)) {
                    _this.speed.y = SPEED;
                } else {
                    _this.speed.y = 0;
                }
            }).on('solids_collision', function (e) {
                var elements = e.detail.elements_collisions.map(function (collision) {
                    return {
                        mask: collision.mask,
                        solid: collision.solid_element,
                        position: collision.solid_element.position
                    };
                });
                var masks = e.detail.masks_collisions.map(function (collision) {
                    return {
                        mask: collision.mask,
                        solid: collision.solid_mask,
                        position: collision.solid_mask.position
                    };
                });
                var tiles = e.detail.tiles_collisions.map(function (collision) {
                    return {
                        mask: collision.mask,
                        solid: collision.solid_tile_data.tile,
                        position: collision.solid_tile_data.position
                    };
                });
                var solids = tiles.concat(elements).concat(masks);
                solids.some(function (solid_data) {
                    var solid = solid_data.solid;
                    var solid_size = solid.getSize();
                    var solid_position = solid_data.position;
                    var event_data = {
                        solid: solid,
                        solid_position: solid_position
                    };
                    var this_size = solid_data.mask.getSize();
                    var this_position = solid_data.mask.position.add(_this.position, true);

                    if (solid_position.y + solid_size.height <= this_position.y) {
                        event_data.direction = RpgPlayer.DIRECTIONS.UP;
                    } else if (this_position.y + this_size.height <= solid_position.y) {
                        event_data.direction = RpgPlayer.DIRECTIONS.DOWN;
                    } else if (solid_position.x + solid_size.width <= this_position.x) {
                        event_data.direction = RpgPlayer.DIRECTIONS.LEFT;
                    } else if (this_position.x + this_size.width <= solid_position.x) {
                        event_data.direction = RpgPlayer.DIRECTIONS.RIGHT;
                    }

                    var custom_event = _this.trigger('rpg.solid_collision', event_data);

                    return custom_event.propagationStopped;
                });
            });

            return _this;
        }

        _createClass(RpgPlayer, [{
            key: "isMovingKey",
            value: function isMovingKey(key) {
                return this.isKeyBindedToAction(key, RpgPlayer.ACTIONS.MOVE_LEFT) || this.isKeyBindedToAction(key, RpgPlayer.ACTIONS.MOVE_RIGHT) || this.isKeyBindedToAction(key, RpgPlayer.ACTIONS.MOVE_UP) || this.isKeyBindedToAction(key, RpgPlayer.ACTIONS.MOVE_DOWN);
            }
        }]);

        return RpgPlayer;
    })(_element2.default);

    RpgPlayer.SPEED = 96;
    RpgPlayer.DIRECTIONS = {
        LEFT: Symbol(),
        RIGHT: Symbol(),
        UP: Symbol(),
        DOWN: Symbol()
    };
    RpgPlayer.ACTIONS = {
        MOVE_LEFT: Symbol(),
        MOVE_RIGHT: Symbol(),
        MOVE_UP: Symbol(),
        MOVE_DOWN: Symbol(),
        INTERACT: Symbol()
    };
    (0, _keys_mapping2.default)(RpgPlayer);
    exports.default = RpgPlayer;
});
//# sourceMappingURL=rpg_player.js.map