define(['exports', 'jsglib/layer', 'jsglib/timer'], function (exports, _layer, _timer) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _layer2 = _interopRequireDefault(_layer);

    var _timer2 = _interopRequireDefault(_timer);

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

    var Game = (function () {
        function Game(game_container) {
            var layers = arguments.length <= 1 || arguments[1] === undefined ? [_layer2.default.MAIN_LAYER, _layer2.default.TILES_LAYER, _layer2.default.BACKGROUND_LAYER] : arguments[1];
            var fps = arguments.length <= 2 || arguments[2] === undefined ? 30 : arguments[2];

            _classCallCheck(this, Game);

            this.container = game_container;
            this.current_room = null;
            this.classes = {};
            this.timer = new _timer2.default(fps);
            this.defineLayers(layers);
        }

        _createClass(Game, [{
            key: 'defineLayers',
            value: function defineLayers(layers) {
                var _this = this;

                this.layers = {};
                layers.forEach(function (layer, key) {
                    layer.setZindex(key);
                    _this.layers[layer.name] = layer;

                    _this.container.appendChild(layer.canvas);
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
                this.last_loop_time = Date.now();
                this.loop();
                return this;
            }
        }, {
            key: 'loop',
            value: function loop() {
                window.requestAnimationFrame(this.loop.bind(this));
                var now = Date.now();
                var delta = now - this.last_loop_time;
                var interval = 1000 / this.timer.fps;

                if (delta <= interval) {
                    this.timer.trigger('step');
                    return this;
                }

                this.render();
                this.last_loop_time = now - delta % interval;
                return this;
            }
        }, {
            key: 'render',
            value: function render() {
                if (!this.layers) {
                    return this;
                }

                for (var layer_name in this.layers) {
                    this.layers[layer_name].draw(this.timer);
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
                    var layer = this.layers[layer_name];
                    layer.setSize(level.width, level.height);
                }

                return this;
            }
        }]);

        return Game;
    })();

    exports.default = Game;
});
//# sourceMappingURL=game.js.map