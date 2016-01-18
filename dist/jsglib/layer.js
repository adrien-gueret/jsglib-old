define(['exports'], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

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

    var Layer = (function () {
        function Layer(name) {
            _classCallCheck(this, Layer);

            this.name = name;
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.canvas.setAttribute('data-name', this.name);
            this.canvas.style.position = 'absolute';
            this.canvas.style.left = 0;
            this.canvas.style.top = 0;
            this.canvas.style.zIndex = 0;
            this.tiles_sprite = null;
            this.tiles = [];
        }

        _createClass(Layer, [{
            key: 'setSize',
            value: function setSize(width, height) {
                this.canvas.width = width;
                this.canvas.height = height;
                return this;
            }
        }, {
            key: 'setZindex',
            value: function setZindex(new_zindex) {
                this.canvas.style.zIndex = new_zindex;
                return this;
            }
        }, {
            key: 'draw',
            value: function draw(timer) {
                var _this = this;

                var force_redraw = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
                this.tiles.forEach(function (row, row_index) {
                    row.forEach(function (tile, column_index) {
                        if (!tile || !tile.sprite_class) {
                            return;
                        }

                        if (!force_redraw && !tile.needs_redraw) {
                            return;
                        }

                        tile.draw(_this.ctx, column_index, row_index, timer).on('animation', function () {
                            _this.tiles[row_index][column_index] = tile.sprite_class.getTile(tile.animation.next_tile_number);
                            tile.off('animaiton');
                        });
                    });
                });
                return this;
            }
        }, {
            key: 'clear',
            value: function clear() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                return this;
            }
        }]);

        return Layer;
    })();

    Layer.MAIN_LAYER = new Layer('MAIN_LAYER');
    Layer.TILES_LAYER = new Layer('TILES_LAYER');
    Layer.BACKGROUND_LAYER = new Layer('BACKGROUND_LAYER');
    exports.default = Layer;
});
//# sourceMappingURL=layer.js.map