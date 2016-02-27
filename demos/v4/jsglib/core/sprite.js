define(["exports", "jsglib/core/tile", "jsglib/core/animation"], function (exports, _tile, _animation) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _tile2 = _interopRequireDefault(_tile);

    var _animation2 = _interopRequireDefault(_animation);

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

    var Sprite = (function () {
        function Sprite() {
            _classCallCheck(this, Sprite);
        }

        _createClass(Sprite, null, [{
            key: "getTilesSize",
            value: function getTilesSize() {
                return {
                    width: this.tiles_width || 0,
                    height: this.tiles_height || 0
                };
            }
        }, {
            key: "hasTiles",
            value: function hasTiles() {
                return this.tiles.length > 0;
            }
        }, {
            key: "getTile",
            value: function getTile(tile_number) {
                var clone = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
                tile_number--;

                if (!this.hasTiles() || tile_number < 0) {
                    return _tile2.default.getNewEmptyTile(this);
                }

                var tiles = this.tiles;
                var total_columns = tiles[0].length;
                var row_index = Math.floor(tile_number / total_columns);
                var column_index = tile_number % total_columns;
                var tile = tiles[row_index] ? tiles[row_index][column_index] : null;

                if (!tile) {
                    return _tile2.default.getNewEmptyTile(this);
                }

                return clone ? tiles[row_index][column_index].clone() : tiles[row_index][column_index];
            }
        }, {
            key: "loadImage",
            value: function loadImage(url) {
                var _this = this;

                var promise = function promise(resolve, reject) {
                    _this.image = new Image();

                    _this.image.onload = function () {
                        _this.makeTiles(_this.image.naturalWidth, _this.image.naturalHeight, 0);

                        resolve(_this.image);
                    };

                    _this.image.onerror = reject;
                    _this.image.src = url;
                };

                return new Promise(promise);
            }
        }, {
            key: "makeTiles",
            value: function makeTiles() {
                var tiles_width = arguments.length <= 0 || arguments[0] === undefined ? 16 : arguments[0];
                var tiles_height = arguments.length <= 1 || arguments[1] === undefined ? 16 : arguments[1];
                var tiles_separation = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

                if (!this.image) {
                    throw ReferenceError(this.name + '.makeTiles(): image not found for this class');
                }

                this.tiles = [];
                this.tiles_width = tiles_width;
                this.tiles_height = tiles_height;
                this.tiles_separation = tiles_separation;
                var image_width = this.image.naturalWidth;
                var image_height = this.image.naturalHeight;
                var tile_number = 1;

                for (var j = 0; j < image_height; j += tiles_height) {
                    var x = j / tiles_height;
                    this.tiles[x] = [];

                    for (var i = 0; i < image_width; i += tiles_width) {
                        this.tiles[x][i / tiles_width] = new _tile2.default(this, i + tiles_separation * (i / tiles_width), j + tiles_separation * (j / tiles_height), tile_number++);
                        image_width -= tiles_separation;
                    }

                    image_width = this.image.naturalWidth;
                    image_height -= tiles_separation;
                }

                return this;
            }
        }, {
            key: "defineTilesAnimations",
            value: function defineTilesAnimations(animations, timer) {
                var _this2 = this;

                this.animations = {};
                animations.forEach(function (animation) {
                    _this2.animations[animation.name || Symbol()] = _animation2.default.define(timer, animation.tiles, animation.time, animation.name);
                });
                return this;
            }
        }, {
            key: "getAnimationClass",
            value: function getAnimationClass(animation_name) {
                return this.animations[animation_name] || null;
            }
        }, {
            key: "defineTilesTypes",
            value: function defineTilesTypes(types) {
                var _this3 = this;

                var keys = Array.prototype.concat(Object.getOwnPropertyNames(types), Object.getOwnPropertySymbols(types));
                keys.forEach(function (type_name) {
                    var tiles_numbers = types[type_name];
                    tiles_numbers.forEach(function (tile_number) {
                        var tile = _this3.getTile(tile_number, false);

                        tile.type = type_name;
                    });
                });
                return this;
            }
        }]);

        return Sprite;
    })();

    Sprite.image = null;
    Sprite.tiles = [];
    Sprite.tiles_width = 0;
    Sprite.tiles_height = 0;
    Sprite.animations = {};
    exports.default = Sprite;
});
//# sourceMappingURL=sprite.js.map