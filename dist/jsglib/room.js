define(["exports", "jsglib/rectangle", "jsglib/http", "jsglib/traits/events_handler"], function (exports, _rectangle, _http, _events_handler) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _rectangle2 = _interopRequireDefault(_rectangle);

    var _http2 = _interopRequireDefault(_http);

    var _events_handler2 = _interopRequireDefault(_events_handler);

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

    var Room = (function () {
        function Room() {
            var width = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var height = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            _classCallCheck(this, Room);

            this.width = width;
            this.height = height;
            this.definition = null;
        }

        _createClass(Room, [{
            key: "destroy",
            value: function destroy() {
                this.definition = null;
                this.off();
                return this;
            }
        }, {
            key: "getRectangle",
            value: function getRectangle() {
                return new _rectangle2.default(this.width, this.height);
            }
        }, {
            key: "getSize",
            value: function getSize() {
                var _getRectangle = this.getRectangle();

                var width = _getRectangle.width;
                var height = _getRectangle.height;
                return {
                    width: width,
                    height: height
                };
            }
        }, {
            key: "initRoom",
            value: function initRoom(game) {
                var _this = this;

                if (!this.definition) {
                    return this;
                }

                if (this.definition.layers) {
                    this.width = 0;
                    this.height = 0;

                    var _loop = function _loop(layer_name) {
                        var definition = _this.definition.layers[layer_name];
                        var layer = game.getLayerFromName(layer_name);
                        layer.tiles_sprite_class = null;
                        layer.tiles = [];

                        if (definition.tiles) {
                            (function () {
                                var SpriteClass = game.getClass(definition.sprite_class);
                                layer.tiles_sprite_class = SpriteClass;
                                definition.tiles.forEach(function (row, row_index) {
                                    layer.tiles[row_index] = layer.tiles[row_index] || [];
                                    row.forEach(function (tile_number, column_index) {
                                        layer.tiles[row_index][column_index] = SpriteClass.getTile(tile_number);
                                    });
                                });
                                layer.clearTilesAnimations().initTilesAnimations(game.timer);
                                var tiles_size = layer.tiles_sprite_class.getTilesSize();
                                _this.width = Math.max(_this.width, layer.tiles[0].length * tiles_size.width);
                                _this.height = Math.max(_this.height, layer.tiles.length * tiles_size.height);
                            })();
                        }
                    };

                    for (var layer_name in this.definition.layers) {
                        _loop(layer_name);
                    }
                } else {
                    this.width = this.definition.width;
                    this.height = this.definition.height;
                }

                return this;
            }
        }, {
            key: "useDefinition",
            value: function useDefinition(data) {
                var _this2 = this;

                var promise = function promise(resolve) {
                    if (typeof data === 'string') {
                        _http2.default.get(data, {
                            data_type: _http2.default.DATA_TYPES.JSON
                        }).then(function (data) {
                            _this2.definition = data;
                            resolve();
                        });
                    } else {
                        _this2.definition = data;
                        resolve();
                    }
                };

                return new Promise(promise);
            }
        }]);

        return Room;
    })();

    (0, _events_handler2.default)(Room);
    exports.default = Room;
});
//# sourceMappingURL=room.js.map