define(["exports", "jsglib/traits/events_handler", "jsglib/core/point", "jsglib/core/rectangle", "jsglib/core/utils"], function (exports, _events_handler, _point, _rectangle, _utils) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _events_handler2 = _interopRequireDefault(_events_handler);

    var _point2 = _interopRequireDefault(_point);

    var _rectangle2 = _interopRequireDefault(_rectangle);

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

    var Element = (function () {
        function Element(x, y) {
            _classCallCheck(this, Element);

            this.prev_position = new _point2.default(NaN, NaN);
            this.position = new _point2.default(x, y);
            this.transform_origin = new _point2.default();
            this.rotation = 0;
            this.layer = null;
            this.sprite_class = null;
            this.current_tile = null;
            this.current_animation = null;
            this.speed = new _point2.default();
            this.acceleration = new _point2.default();
            this.stop_on_solids = false;
            this.is_destroyed = false;
            this.is_inside_room = false;
        }

        _createClass(Element, [{
            key: "destroy",
            value: function destroy() {
                var custom_event = this.trigger('destroy');

                if (custom_event.defaultPrevented) {
                    return this;
                }

                this.is_destroyed = true;
                return this;
            }
        }, {
            key: "setSpriteClass",
            value: function setSpriteClass(sprite_class) {
                var current_tile_number = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
                this.sprite_class = sprite_class;
                this.current_tile = sprite_class.getTile(current_tile_number);
                return this;
            }
        }, {
            key: "setCurrentTileNumber",
            value: function setCurrentTileNumber(tile_number) {
                this.current_tile = this.sprite_class.getTile(tile_number);

                if (this.layer) {
                    this.layer.needs_clear = true;
                }

                return this;
            }
        }, {
            key: "useAnimation",
            value: function useAnimation(animation_name, time) {
                var _this = this;

                var loop = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
                var timer = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

                if (this.current_animation && this.current_animation.is_running) {
                    if (this.getAnimationName() === animation_name) {
                        return this;
                    }

                    this.current_animation.stop();
                }

                var animation_class = this.sprite_class.getAnimationClass(animation_name);

                if (!animation_class) {
                    throw new ReferenceError('Element.useAnimation: animation "' + animation_name + '" is not defined for sprite "' + this.sprite_class.name + '".');
                }

                this.current_animation = new animation_class(timer);
                this.setCurrentTileNumber(this.current_animation.getCurrentTileNumber());
                this.current_animation.on('animation_update', function () {
                    _this.setCurrentTileNumber(_this.current_animation.getCurrentTileNumber());
                }).start(time, loop);
                return this;
            }
        }, {
            key: "getAnimationName",
            value: function getAnimationName() {
                return this.current_animation ? this.current_animation.name : '';
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
            key: "getDirection",
            value: function getDirection() {
                var to_degree = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
                var direction = Math.atan2(-this.speed.y, this.speed.x);
                return to_degree ? (0, _utils.radianToDegree)(direction) : direction;
            }
        }, {
            key: "draw",
            value: function draw(ctx) {
                var transform_origin = this.position.add(this.transform_origin, true);
                var draw_position = this.position.subtract(transform_origin, true);
                ctx.save();
                ctx.translate(transform_origin.x, transform_origin.y);
                ctx.rotate((0, _utils.degreeToRadian)(this.rotation));
                this.current_tile.draw(ctx, draw_position.x, draw_position.y);
                ctx.restore();
                return this;
            }
        }, {
            key: "getRectangle",
            value: function getRectangle() {
                var size = this.sprite_class ? this.sprite_class.getTilesSize() : {};
                return new _rectangle2.default(size.width, size.height, this.position);
            }
        }, {
            key: "setTransformOriginToCenter",
            value: function setTransformOriginToCenter() {
                var _getSize = this.getSize();

                var width = _getSize.width;
                var height = _getSize.height;
                this.transform_origin.set(width / 2, height / 2);
                return this;
            }
        }, {
            key: "move",
            value: function move(delta_time) {
                var delta_position = new _point2.default(delta_time, delta_time);
                this.speed.add(this.acceleration);
                this.position.add(this.speed.multiply(delta_position, true));
                return this;
            }
        }, {
            key: "checkCollisions",
            value: function checkCollisions(layers) {
                var _this2 = this;

                var has_solid_collision = false;
                var solid_tiles = [];

                for (var layer_name in layers) {
                    var layer = layers[layer_name];
                    var collisions_data = this.checkTilesCollisions(layer);

                    if (this.stop_on_solids && collisions_data.solids_collisions) {
                        has_solid_collision = true;
                        var new_solid_tiles = collisions_data.tiles.filter(function (tile_data) {
                            return tile_data.tile.isSolid();
                        });
                        solid_tiles = solid_tiles.concat(new_solid_tiles);
                        this.refinePosition(layer, this.checkTilesCollisions);

                        if (collisions_data.slopes_collisions) {
                            this.refinePositionOnSlopes(new_solid_tiles.filter(function (tile_data) {
                                return tile_data.tile.isSlope();
                            }));
                        }
                    }

                    collisions_data.tiles.some(function (tile_data) {
                        var custom_event = _this2.trigger('tile_collision', {
                            tile_data: tile_data
                        });

                        return custom_event.propagationStopped;
                    });
                }

                if (!has_solid_collision) {
                    this.trigger('no_solids_collision');
                } else {
                    this.trigger('solids_collision', {
                        tiles: solid_tiles
                    });
                }
            }
        }, {
            key: "checkTilesCollisions",
            value: function checkTilesCollisions(layer) {
                var position = arguments.length <= 1 || arguments[1] === undefined ? this.position : arguments[1];
                var data = {
                    tiles: [],
                    solids_collisions: false,
                    slopes_collisions: false,
                    only_slopes_collisions: false
                };

                if (!layer.tiles.length) {
                    return data;
                }

                var rectangle = this.getRectangle();
                rectangle.position.copy(position);
                data.tiles = layer.getTilesFromRectangle(rectangle);
                var solids_tiles = data.tiles.filter(function (tile_data) {
                    return tile_data.tile.isSolid();
                });
                data.solids_collisions = solids_tiles.length > 0;
                data.slopes_collisions = data.solids_collisions && solids_tiles.some(function (tile_data) {
                    return tile_data.tile.isSlope();
                });
                data.only_slopes_collisions = data.slopes_collisions && solids_tiles.every(function (tile_data) {
                    return tile_data.tile.isSlope();
                });
                return data;
            }
        }, {
            key: "refinePosition",
            value: function refinePosition(layer, checkCollisionsMethod) {
                var delta_position = this.position.subtract(this.prev_position, true);
                var limit_x = Math.abs(delta_position.x);
                var limit_y = Math.abs(delta_position.y);
                var delta_x = Math.sign(delta_position.x);
                var delta_y = Math.sign(delta_position.y);
                var new_position = this.prev_position.clone();

                for (var x = 0; x < limit_x; x++) {
                    new_position.x += delta_x;
                    var collisions_data = checkCollisionsMethod.call(this, layer, new_position);

                    if (collisions_data.solids_collisions && !collisions_data.only_slopes_collisions) {
                        new_position.x -= delta_x;
                        break;
                    }
                }

                for (var y = 0; y < limit_y; y++) {
                    new_position.y += delta_y;
                    var collisions_data = checkCollisionsMethod.call(this, layer, new_position);

                    if (collisions_data.solids_collisions && !collisions_data.only_slopes_collisions) {
                        new_position.y -= delta_y;
                        break;
                    }
                }

                this.position.copy(new_position);
                return this;
            }
        }, {
            key: "refinePositionOnSlopes",
            value: function refinePositionOnSlopes(slopes_tiles_data) {
                var _this3 = this;

                var new_position = this.position.clone();
                var height = this.getSize().height;
                var center_x = this.getRectangle().getCenter().x;
                return slopes_tiles_data.some(function (slope_data) {
                    var y_contact = slope_data.tile.getContactY(center_x, slope_data.position);

                    if (isNaN(y_contact)) {
                        return false;
                    }

                    new_position.y = y_contact - height - 1;

                    if (new_position.y - _this3.position.y >= 0) {
                        return true;
                    }

                    _this3.position.copy(new_position).round();

                    return true;
                });
            }
        }]);

        return Element;
    })();

    (0, _events_handler2.default)(Element);
    exports.default = Element;
});
//# sourceMappingURL=element.js.map