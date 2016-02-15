define(["exports", "jsglib/traits/events_handler", "jsglib/point", "jsglib/rectangle"], function (exports, _events_handler, _point, _rectangle) {
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
            this.layer = null;
            this.sprite_class = null;
            this.current_tile = null;
            this.current_animation = null;
            this.speed = new _point2.default();
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
            key: "draw",
            value: function draw(ctx) {
                this.current_tile.draw(ctx, this.position.x, this.position.y);
                return this;
            }
        }, {
            key: "getRectangle",
            value: function getRectangle() {
                var size = this.sprite_class ? this.sprite_class.getTilesSize() : {};
                return new _rectangle2.default(size.width, size.height, this.position);
            }
        }, {
            key: "move",
            value: function move(delta) {
                var deltaPosition = new _point2.default(delta, delta);
                this.position.add(this.speed.multiply(deltaPosition), false);
                var _position = this.position;
                var x = _position.x;
                var y = _position.y;
                x += x < 0 ? -.5 : .5;
                y += y < 0 ? -.5 : .5;
                this.position.set(x | 0, y | 0);
                return this;
            }
        }, {
            key: "checkCollisions",
            value: function checkCollisions(layers) {
                var _this2 = this;

                var has_solid_collision = false;

                for (var layer_name in layers) {
                    var layer = layers[layer_name];
                    var collisions_data = this.checkTilesCollisions(layer);

                    if (this.stop_on_solids && collisions_data.solid_collision) {
                        has_solid_collision = true;
                        this.refinePosition(layer, this.checkTilesCollisions);
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
                }
            }
        }, {
            key: "checkTilesCollisions",
            value: function checkTilesCollisions(layer) {
                var position = arguments.length <= 1 || arguments[1] === undefined ? this.position : arguments[1];
                var data = {
                    tiles: [],
                    solid_collision: false
                };

                if (!layer.tiles.length) {
                    return data;
                }

                var rectangle = this.getRectangle();
                rectangle.position.copy(position);
                data.tiles = layer.getTilesFromRectangle(rectangle);
                data.solid_collision = data.tiles.some(function (tile_data) {
                    return tile_data.tile.isSolid();
                });
                return data;
            }
        }, {
            key: "refinePosition",
            value: function refinePosition(layer, checkCollisionsMethod) {
                var delta_position = this.position.substract(this.prev_position);
                var limit_x = Math.abs(delta_position.x);
                var limit_y = Math.abs(delta_position.y);
                var delta_x = Math.sign(delta_position.x);
                var delta_y = Math.sign(delta_position.y);
                var new_position = this.prev_position.clone();

                for (var x = 0; x < limit_x; x++) {
                    new_position.x += delta_x;

                    if (checkCollisionsMethod.call(this, layer, new_position).solid_collision) {
                        new_position.x -= delta_x;
                        break;
                    }
                }

                for (var y = 0; y < limit_y; y++) {
                    new_position.y += delta_y;

                    if (checkCollisionsMethod.call(this, layer, new_position).solid_collision) {
                        new_position.y -= delta_y;
                        break;
                    }
                }

                this.position.copy(new_position);
            }
        }]);

        return Element;
    })();

    (0, _events_handler2.default)(Element);
    exports.default = Element;
});
//# sourceMappingURL=element.js.map