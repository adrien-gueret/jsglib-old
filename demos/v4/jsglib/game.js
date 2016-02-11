function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(['exports', 'jsglib/layer', 'jsglib/timer', 'jsglib/events_handler', 'jsglib/inputs'], function (exports, _layer3, _timer, _events_handler, _inputs) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _layer4 = _interopRequireDefault(_layer3);

    var _timer2 = _interopRequireDefault(_timer);

    var _events_handler2 = _interopRequireDefault(_events_handler);

    var _inputs2 = _interopRequireDefault(_inputs);

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

        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
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

    var Game = (function (_EventsHandler) {
        _inherits(Game, _EventsHandler);

        function Game(game_container) {
            var layers = arguments.length <= 1 || arguments[1] === undefined ? [_layer4.default.MAIN_LAYER, _layer4.default.TILES_LAYER, _layer4.default.BACKGROUND_LAYER] : arguments[1];
            var fps = arguments.length <= 2 || arguments[2] === undefined ? 30 : arguments[2];

            _classCallCheck(this, Game);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this));

            _this.container = game_container;
            _this.current_room = null;
            _this.classes = {};
            _this.timer = new _timer2.default(fps);
            _this.is_stopped = false;

            _this.defineLayers(layers);

            _this.inputs = new _inputs2.default(_this.container);

            _this.inputs.on('click', function () {
                for (var layer_name in _this.layers) {
                    var layer = _this.layers[layer_name];
                    layer.elements.some(function (element) {
                        if (_this.inputs.mouse.isOverElement(element)) {
                            var custom_event = element.trigger('click', {
                                mouse: _this.inputs.mouse
                            });
                            return custom_event.propagationStopped;
                        }
                    });
                }
            });

            return _this;
        }

        _createClass(Game, [{
            key: 'defineLayers',
            value: function defineLayers(layers) {
                var _this2 = this;

                this.layers = {};
                layers.reverse().forEach(function (layer, key) {
                    layer.setZindex(key);
                    _this2.layers[layer.name] = layer;

                    _this2.container.appendChild(layer.canvas);
                });
                return this;
            }
        }, {
            key: 'getLayerFromName',
            value: function getLayerFromName(layer_name) {
                return this.layers[layer_name];
            }
        }, {
            key: 'registerClass',
            value: function registerClass(new_class) {
                this.classes[new_class.name] = new_class;
                return this;
            }
        }, {
            key: 'getClass',
            value: function getClass(class_name) {
                if (typeof class_name === 'function') {
                    return class_name;
                }

                if (this.classes[class_name]) {
                    return this.classes[class_name];
                }

                return window[class_name];
            }
        }, {
            key: 'start',
            value: function start() {
                this.trigger('start');
                this.last_loop_time = Date.now();
                this.loop();
                return this;
            }
        }, {
            key: 'stop',
            value: function stop() {
                var custom_event = this.trigger('stop');

                if (custom_event.defaultPrevented) {
                    return this;
                }

                this.is_stopped = true;
                return this;
            }
        }, {
            key: 'loop',
            value: function loop() {
                if (this.is_stopped) {
                    this.container = null;
                    this.classes = null;
                    this.layers = {};
                    this.current_room.destroy();
                    this.current_room = null;
                    this.timer.destroy();
                    this.timer = null;
                    this.inputs.destroy();
                    this.inputs = null;
                    return this;
                }

                window.requestAnimationFrame(this.loop.bind(this));
                var now = Date.now();
                var delta = now - this.last_loop_time;
                var interval = 1000 / this.timer.fps;

                if (delta <= interval) {
                    return this;
                }

                this.timer.trigger('frame');
                this.manageElements(delta / 1000);
                this.render();
                this.last_loop_time = now - delta % interval;
                return this;
            }
        }, {
            key: 'manageElements',
            value: function manageElements(delta) {
                var _this3 = this;

                var _loop = function _loop(layer_name) {
                    var layer = _this3.layers[layer_name];
                    layer.elements.forEach(function (element) {
                        if (element.is_destroyed) {
                            return;
                        }

                        element.trigger('frame');
                        element.move(delta);

                        if (!element.position.equals(element.prev_position)) {
                            element.checkCollisions(_this3.layers);
                        }

                        if (element.position.equals(element.prev_position)) {
                            return;
                        }

                        if (_this3.current_room.getRectangle().isCollidedWithRectangle(element.getRectangle())) {
                            if (!element.is_inside_room) {
                                element.trigger('enter_room', {
                                    room: _this3.current_room
                                });
                            }

                            element.is_inside_room = true;
                        } else {
                            if (element.is_inside_room) {
                                element.trigger('leave_room', {
                                    room: _this3.current_room
                                });
                            }

                            element.is_inside_room = false;
                        }

                        layer.needs_clear = true;
                        element.prev_position.copy(element.position);
                    });
                    layer.elements.filter(function (element) {
                        return element.is_destroyed;
                    }).forEach(function (element) {
                        layer.removeElement(element);
                        element.current_tile = null;
                        element.current_animation = null;
                    });
                };

                for (var layer_name in this.layers) {
                    _loop(layer_name);
                }

                return this;
            }
        }, {
            key: 'render',
            value: function render() {
                for (var layer_name in this.layers) {
                    var _layer = this.layers[layer_name];
                    var force_redraw = false;

                    if (_layer.needs_clear) {
                        _layer.clear();

                        _layer.needs_clear = false;
                        force_redraw = true;
                    }

                    _layer.draw(force_redraw);
                }

                return this;
            }
        }, {
            key: 'goToRoom',
            value: function goToRoom(level) {
                this.current_room = level;
                level.initRoom(this);
                this.container.style.width = level.width + 'px';
                this.container.style.height = level.height + 'px';

                for (var layer_name in this.layers) {
                    var _layer2 = this.layers[layer_name];

                    _layer2.setSize(level.width, level.height);
                }

                level.trigger('start');
                return this;
            }
        }]);

        return Game;
    })(_events_handler2.default);

    exports.default = Game;
});
//# sourceMappingURL=game.js.map