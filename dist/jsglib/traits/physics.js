define(["exports", "jsglib/core/trait", "jsglib/core/element", "jsglib/core/point"], function (exports, _trait, _element, _point) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _trait2 = _interopRequireDefault(_trait);

    var _element2 = _interopRequireDefault(_element);

    var _point2 = _interopRequireDefault(_point);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var Trait_Physics = (0, _trait2.default)({
        initPhysics: function initPhysics() {
            var _this = this;

            var gravity = arguments.length <= 0 || arguments[0] === undefined ? new _point2.default(0, 10) : arguments[0];

            if (!this instanceof _element2.default) {
                throw new TypeError('Trait_Physics: trying to init gravity feature on non-Element instance');
            }

            this.$forces = [gravity];
            this.$impulses = [];
            this.bounce_factor = new _point2.default(0);
            this.on('solids_collision', function (e) {
                var this_size = _this.getSize();

                var impulse = new _point2.default();
                e.detail.tiles.some(function (tile_data) {
                    var tile_position = tile_data.position;
                    var tile_size = tile_data.tile.getSize();

                    if (tile_position.y + tile_size.height <= _this.position.y) {
                        impulse.y = _this.speed.y * _this.bounce_factor.y;
                        _this.speed.y = 0;
                        return true;
                    } else if (_this.position.y + this_size.height <= tile_position.y) {
                        impulse.y = _this.speed.y * _this.bounce_factor.y;
                        _this.speed.y = 0;
                        return true;
                    } else if (tile_position.x + tile_size.width <= _this.position.x) {
                        impulse.x = _this.speed.x * _this.bounce_factor.x;
                        _this.speed.x = 0;
                        return true;
                    } else if (_this.position.x + this_size.width <= tile_position.x) {
                        impulse.x = _this.speed.x * _this.bounce_factor.x;
                        _this.speed.x = 0;
                        return true;
                    }
                });

                _this.applyImpulse(impulse.multiply(new _point2.default(-1, -1)));
            });
        },
        move: function move(delta_time) {
            this.acceleration = new _point2.default();

            if (this.$forces.length) {
                this.acceleration = this.$forces.reduce(function (force1, force2) {
                    return force1.add(force2, true);
                });
            }

            var impulse = new _point2.default();

            if (this.$impulses.length) {
                impulse = this.$impulses.reduce(function (impulse1, impulse2) {
                    return impulse1.add(impulse2, true);
                });
            }

            this.speed.add(impulse).add(this.acceleration);
            var delta_position = new _point2.default(delta_time, delta_time);
            this.position.add(this.speed.multiply(delta_position, true));
            this.$impulses.length = 0;
            return this;
        },
        applyImpulse: function applyImpulse(impulse) {
            this.$impulses.push(impulse);
            return this;
        }
    });
    exports.default = Trait_Physics;
});
//# sourceMappingURL=physics.js.map