define(["exports", "jsglib/tile"], function (exports, _tile) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _tile2 = _interopRequireDefault(_tile);

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

            this.image = this.constructor.image;
        }

        _createClass(Sprite, [{
            key: "getTilesSize",
            value: function getTilesSize() {
                return this.constructor.getTilesSize();
            }
        }], [{
            key: "getTilesSize",
            value: function getTilesSize() {
                return {
                    width: this.tiles_width || 0,
                    height: this.tiles_height || 0
                };
            }
        }, {
            key: "getTile",
            value: function getTile(tile_number) {
                var clone = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
                tile_number--;

                if (tile_number < 0) {
                    return new _tile2.default(null);
                }

                var tiles = this.tiles;
                var total_columns = tiles[0].length;
                var row_index = Math.floor(tile_number / total_columns);
                var column_index = tile_number % total_columns;
                var tile = tiles[row_index][column_index];

                if (!tile) {
                    return new _tile2.default(null);
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

                for (var j = 0; j < image_height; j += tiles_height) {
                    var x = j / tiles_height;
                    this.tiles[x] = [];

                    for (var i = 0; i < image_width; i += tiles_width) {
                        this.tiles[x][i / tiles_width] = new _tile2.default(this, i + tiles_separation * (i / tiles_width), j + tiles_separation * (j / tiles_height));
                        image_width -= tiles_separation;
                    }

                    image_width = this.image.naturalWidth;
                    image_height -= tiles_separation;
                }

                return this;
            }
        }, {
            key: "defineTilesAnimations",
            value: function defineTilesAnimations() {
                var _this2 = this;

                for (var _len = arguments.length, animations = Array(_len), _key = 0; _key < _len; _key++) {
                    animations[_key] = arguments[_key];
                }

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    var _loop = function _loop() {
                        var animation = _step.value;
                        animation.tiles.forEach(function (tile_number, index) {
                            var current_animated_tile = _this2.getTile(tile_number, false);

                            var next_tile_number = animation.tiles[index + 1] || animation.tiles[0];
                            current_animated_tile.setAnimation(next_tile_number, animation.time);
                        });
                    };

                    for (var _iterator = animations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        _loop();
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return this;
            }
        }, {
            key: "defineTilesTypes",
            value: function defineTilesTypes() {
                for (var _len2 = arguments.length, types = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    types[_key2] = arguments[_key2];
                }

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = types[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var type = _step2.value;
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                return this;
            }
        }]);

        return Sprite;
    })();

    Sprite.TILES_TYPES = {
        WALL: Symbol()
    };
    exports.default = Sprite;
});
//# sourceMappingURL=sprite.js.map