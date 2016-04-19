define(["exports", "jsglib/traits/events_handler", "jsglib/core/point", "jsglib/core/rectangle", "jsglib/core/mask", "jsglib/core/utils"], function (exports, _events_handler, _point, _rectangle, _mask, _utils) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _events_handler2 = _interopRequireDefault(_events_handler);

    var _point2 = _interopRequireDefault(_point);

    var _rectangle2 = _interopRequireDefault(_rectangle);

    var _mask2 = _interopRequireDefault(_mask);

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
            this.is_destroyed = false;
            this.is_inside_room = false;
            this.is_solid = false;
            this.stop_on_solids = false;
        }

        _createClass(Element, [{
            key: "destroy",
            value: function destroy() {
                var custom_event = this.trigger('destroy');

                if (custom_event.defaultPrevented) {
                    return this;
                }

                if (this.current_animation) {
                    this.current_animation.stop();
                    this.current_animation = null;
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
            key: "getCurrentMasks",
            value: function getCurrentMasks() {
                return this.current_tile.hasMasks() ? this.current_tile.masks : [_mask2.default.createFromRectangle(this.getRectangle(), this.is_solid, this.stop_on_solids)];
            }
        }, {
            key: "checkCollisions",
            value: function checkCollisions(layers) {
                var _this2 = this;

                var has_solid_collision = false;
                var solid_tiles_collisions = [];
                var solid_elements_collisions = [];
                var solid_masks_collisions = [];
                this.getCurrentMasks().forEach(function (mask) {
                    for (var layer_name in layers) {
                        var layer = layers[layer_name];

                        var collisions_data = _this2.checkTilesCollisions(layer, mask);

                        if (mask.stop_on_solids && collisions_data.solids_collisions) {
                            has_solid_collision = true;
                            var new_solid_collisions = collisions_data.tiles.filter(function (tile_data) {
                                return tile_data.tile.isSolid();
                            });
                            new_solid_collisions = new_solid_collisions.map(function (solid_tile_data) {
                                return {
                                    mask: mask,
                                    solid_tile_data: solid_tile_data
                                };
                            });
                            solid_tiles_collisions = solid_tiles_collisions.concat(new_solid_collisions);

                            _this2.refinePosition(layer, mask, _this2.checkTilesCollisions);

                            if (collisions_data.slopes_collisions) {
                                _this2.refinePositionOnSlopes(new_solid_collisions.filter(function (collision_data) {
                                    return collision_data.solid_tile_data.tile.isSlope();
                                }));
                            }
                        }

                        collisions_data.tiles.some(function (tile_data) {
                            var custom_event = _this2.trigger('tile_collision', {
                                tile_data: tile_data,
                                mask: mask
                            });

                            return custom_event.propagationStopped;
                        });
                        collisions_data = _this2.checkElementsCollisions(layer, mask);

                        if (mask.stop_on_solids && collisions_data.solids_collisions) {
                            has_solid_collision = true;
                            collisions_data.collisions.forEach(function (collision) {
                                if (collision.element.is_solid) {
                                    solid_elements_collisions.push({
                                        mask: mask,
                                        solid_element: collision.element
                                    });
                                }

                                var new_solid_masks = collision.masks.filter(function (mask) {
                                    return mask.is_solid;
                                });
                                new_solid_masks = new_solid_masks.map(function (solid_mask) {
                                    return {
                                        mask: mask,
                                        solid_mask: solid_mask
                                    };
                                });
                                solid_masks_collisions = solid_masks_collisions.concat(new_solid_masks);
                            });

                            _this2.refinePosition(layer, mask, _this2.checkElementsCollisions);
                        }

                        collisions_data.collisions.some(function (collision) {
                            var custom_event = _this2.trigger('collision', {
                                collision: collision
                            });

                            return custom_event.propagationStopped;
                        });
                    }
                });

                if (!has_solid_collision) {
                    this.trigger('no_solids_collision');
                } else {
                    var elements_collisions = solid_elements_collisions.map(function (collision) {
                        return {
                            mask: collision.mask,
                            solid: collision.solid_element,
                            position: collision.solid_element.position
                        };
                    });
                    var masks_collisions = solid_masks_collisions.map(function (collision) {
                        return {
                            mask: collision.mask,
                            solid: collision.solid_mask,
                            position: collision.solid_mask.position
                        };
                    });
                    var tiles_collisions = solid_tiles_collisions.map(function (collision) {
                        return {
                            mask: collision.mask,
                            solid: collision.solid_tile_data.tile,
                            position: collision.solid_tile_data.position
                        };
                    });
                    var all_solids_collisions = tiles_collisions.concat(elements_collisions).concat(masks_collisions);
                    this.trigger('solids_collision', {
                        elements_collisions: elements_collisions,
                        masks_collisions: masks_collisions,
                        tiles_collisions: tiles_collisions,
                        all_solids_collisions: all_solids_collisions
                    });
                }
            }
        }, {
            key: "checkTilesCollisions",
            value: function checkTilesCollisions(layer, mask) {
                var position = arguments.length <= 2 || arguments[2] === undefined ? this.position : arguments[2];
                var data = {
                    tiles: [],
                    solids_collisions: false,
                    slopes_collisions: false,
                    only_slopes_collisions: false
                };

                if (!layer.tiles.length) {
                    return data;
                }

                var rectangle = mask.clone();
                rectangle.position.add(position);
                data.tiles = layer.getTilesFromRectangle(rectangle);
                var end_slope_tile = data.tiles.filter(function (tile_data) {
                    return tile_data.tile.isEndSlope();
                })[0];

                if (end_slope_tile) {
                    var contact_y = end_slope_tile.tile.getContactY(rectangle.getCenter().x, end_slope_tile.position);

                    if (!isNaN(contact_y)) {
                        (function () {
                            var delta = end_slope_tile.tile.getSize().width;

                            if (end_slope_tile.tile.slope_point.x === 0) {
                                delta *= -1;
                            }

                            data.tiles = data.tiles.filter(function (tile_data) {
                                return !(tile_data.tile.isSolid() && tile_data.position.y === end_slope_tile.position.y && tile_data.position.x === end_slope_tile.position.x + delta);
                            });
                        })();
                    }
                }

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
            key: "checkElementsCollisions",
            value: function checkElementsCollisions(layer, mask) {
                var _this3 = this;

                var position = arguments.length <= 2 || arguments[2] === undefined ? this.position : arguments[2];
                var data = {
                    collisions: [],
                    solids_collisions: false
                };

                if (!layer.elements.length) {
                    return data;
                }

                var rectangle = mask.clone();
                rectangle.position.add(position);
                layer.elements.forEach(function (element) {
                    if (element === _this3) {
                        return;
                    }

                    var collision = {
                        element: null,
                        masks: []
                    };
                    element.getCurrentMasks().forEach(function (otherMask) {
                        var otherRectangle = otherMask.clone();
                        otherRectangle.position.add(element.position);

                        if (rectangle.isCollidedWithRectangle(otherRectangle)) {
                            collision.element = element;
                            collision.masks.push(otherRectangle);
                        }
                    });

                    if (collision.element) {
                        data.collisions.push(collision);
                    }
                });
                data.solids_collisions = data.collisions.some(function (collision) {
                    return collision.element.is_solid || collision.masks.some(function (mask) {
                        return mask.is_solid;
                    });
                });
                return data;
            }
        }, {
            key: "refinePosition",
            value: function refinePosition(layer, mask, checkCollisionsMethod) {
                var delta_position = this.position.subtract(this.prev_position, true);
                var limit_x = Math.abs(delta_position.x);
                var limit_y = Math.abs(delta_position.y);
                var delta_x = Math.sign(delta_position.x);
                var delta_y = Math.sign(delta_position.y);
                var new_position = this.prev_position.clone();

                for (var x = 0; x < limit_x; x++) {
                    new_position.x += delta_x;
                    var collisions_data = checkCollisionsMethod.call(this, layer, mask, new_position);

                    if (collisions_data.solids_collisions && !collisions_data.only_slopes_collisions) {
                        new_position.x -= delta_x;
                        break;
                    }
                }

                for (var y = 0; y < limit_y; y++) {
                    new_position.y += delta_y;
                    var collisions_data = checkCollisionsMethod.call(this, layer, mask, new_position);

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
                var _this4 = this;

                var new_position = this.position.clone();
                var height = this.getSize().height;
                var center_x = this.getRectangle().getCenter().x;
                return slopes_tiles_data.some(function (slope_data) {
                    var y_contact = slope_data.solid_tile_data.tile.getContactY(center_x, slope_data.solid_tile_data.position);

                    if (isNaN(y_contact)) {
                        return false;
                    }

                    new_position.y = y_contact - height - 1;

                    if (new_position.y - _this4.position.y >= 0) {
                        return true;
                    }

                    _this4.position.copy(new_position).round();

                    return true;
                });
            }
        }, {
            key: "onCollision",
            value: function onCollision(targetClass, callback) {
                this.on('collision', function (e) {
                    var element = e.detail.collision.element;

                    if (element instanceof targetClass) {
                        callback(e.detail.collision, e);
                    }
                });
                return this;
            }
        }]);

        return Element;
    })();

    (0, _events_handler2.default)(Element);
    exports.default = Element;
});
//# sourceMappingURL=element.js.map