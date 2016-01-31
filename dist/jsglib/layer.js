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
            this.tiles_sprite_class = null;
            this.needs_clear = false;
            this.tiles = [];
            this.elements = [];
            this.tiles_animations = [];
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
            key: 'getTileFromPoint',
            value: function getTileFromPoint(point) {
                if (!this.tiles_sprite_class) {
                    return null;
                }

                var tiles_size = this.tiles_sprite_class.getTilesSize();
                var row = this.tiles[Math.floor(point.y / tiles_size.height)];

                if (!row) {
                    return null;
                }

                return row[Math.floor(point.x / tiles_size.width)] || null;
            }
        }, {
            key: 'getAllTilesFromNumber',
            value: function getAllTilesFromNumber(tile_number) {
                var tiles = [];
                this.tiles.forEach(function (row) {
                    row.forEach(function (tile) {
                        if (tile.tile_number === tile_number) {
                            tiles.push(tile);
                        }
                    });
                });
                return tiles;
            }
        }, {
            key: 'addElement',
            value: function addElement(element) {
                if (element.layer) {
                    element.layer.removeElement(element);
                }

                element.layer = this;
                this.elements.push(element);
                this.needs_clear = true;
                return this;
            }
        }, {
            key: 'removeElement',
            value: function removeElement(element_to_remove) {
                var _this = this;

                this.elements.some(function (element, element_index) {
                    if (element === element_to_remove) {
                        _this.elements.splice(element_index, 1);

                        element_to_remove.layer = null;
                        _this.needs_clear = true;
                        return true;
                    }
                });
                return this;
            }
        }, {
            key: 'clearTilesAnimations',
            value: function clearTilesAnimations() {
                this.tiles_animations.forEach(function (animation) {
                    animation.stop();
                });
                this.tiles_animations = [];
                return this;
            }
        }, {
            key: 'initTilesAnimations',
            value: function initTilesAnimations(timer) {
                var _this2 = this;

                if (!this.tiles_sprite_class) {
                    throw new Error('Layer.initTilesAnimation: this layer has no Sprite class for its tiles.');
                }

                var keys = Array.prototype.concat(Object.getOwnPropertyNames(this.tiles_sprite_class.animations), Object.getOwnPropertySymbols(this.tiles_sprite_class.animations));
                keys.forEach(function (key) {
                    var animation_class = _this2.tiles_sprite_class.animations[key];
                    var animation = new animation_class(timer);

                    _this2.tiles_animations.push(animation);

                    animation.on('animation_udpate', function () {
                        _this2.getAllTilesFromNumber(animation.getPreviousTileNumber()).forEach(function (tile) {
                            tile.setTileNumber(animation.getCurrentTileNumber());
                        });
                    }).start();
                });
                return this;
            }
        }, {
            key: 'draw',
            value: function draw() {
                var _this3 = this;

                var force_redraw = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

                if (this.tiles.length) {
                    this.tiles.forEach(function (row, row_index) {
                        row.forEach(function (tile, column_index) {
                            if (!force_redraw && !tile.needs_redraw) {
                                return;
                            }

                            var tiles_size = {
                                width: tile.sprite_class.tiles_width,
                                height: tile.sprite_class.tiles_height
                            };
                            var dest_x = column_index * tiles_size.width;
                            var dest_y = row_index * tiles_size.height;
                            tile.needs_redraw = false;
                            tile.clear(_this3.ctx, dest_x, dest_y);

                            if (tile.is_empty) {
                                return;
                            }

                            tile.draw(_this3.ctx, dest_x, dest_y);
                        });
                    });
                    return this;
                }

                if (!force_redraw) {
                    return this;
                }

                this.elements.forEach(function (element) {
                    element.draw(_this3.ctx);
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