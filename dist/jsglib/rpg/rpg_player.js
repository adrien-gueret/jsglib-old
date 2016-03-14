function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/rpg/rpg_core", "jsglib/core/element", "jsglib/core/point", "jsglib/core/inputs", "jsglib/traits/keys_mapping"], function (exports, _rpg_core, _element, _point, _inputs, _keys_mapping) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _element2 = _interopRequireDefault(_element);

    var _point2 = _interopRequireDefault(_point);

    var _inputs2 = _interopRequireDefault(_inputs);

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
                var elements = e.detail.elements.map(function (element) {
                    return {
                        position: element.position,
                        element: element
                    };
                });
                var solids = e.detail.tiles.concat(elements);

                var this_size = _this.getSize();

                solids.some(function (solid_data) {
                    var solid = solid_data.tile || solid_data.element;
                    var solid_size = solid.getSize();
                    var solid_position = solid_data.position;
                    var event_data = {
                        solid: solid,
                        solid_position: solid_position,
                        is_tile: !!solid_data.tile
                    };

                    if (solid_position.y + solid_size.height <= _this.position.y) {
                        event_data.direction = _rpg_core.DIRECTIONS.UP;
                    } else if (_this.position.y + this_size.height <= solid_position.y) {
                        event_data.direction = _rpg_core.DIRECTIONS.DOWN;
                    } else if (solid_position.x + solid_size.width <= _this.position.x) {
                        event_data.direction = _rpg_core.DIRECTIONS.LEFT;
                    } else if (_this.position.x + this_size.width <= solid_position.x) {
                        event_data.direction = _rpg_core.DIRECTIONS.RIGHT;
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

    RpgPlayer.SPEED = 100;
    RpgPlayer.ACTIONS = {
        MOVE_LEFT: Symbol(),
        MOVE_RIGHT: Symbol(),
        MOVE_UP: Symbol(),
        MOVE_DOWN: Symbol(),
        MOVE_ACTION_1: Symbol(),
        MOVE_ACTION_2: Symbol()
    };
    (0, _keys_mapping2.default)(RpgPlayer);
    exports.default = RpgPlayer;
});
//# sourceMappingURL=rpg_player.js.map