define(["exports", "jsglib/trait", "jsglib/element"], function (exports, _trait, _element) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _trait2 = _interopRequireDefault(_trait);

    var _element2 = _interopRequireDefault(_element);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var Trait_MoveWrap = (0, _trait2.default)({
        initMoveWrap: function initMoveWrap() {
            var _this = this;

            var wrap_horizontally = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
            var wrap_vertically = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

            if (!this instanceof _element2.default) {
                throw new TypeError('Trait_MoveWrap: trying to init move wrap feature on non-Element instance');
            }

            this.on('leave_room', function (e) {
                var size = _this.getSize();

                if (wrap_vertically) {
                    if (_this.position.y + size.height <= 0) {
                        _this.position.y = e.detail.room.height;
                    } else if (_this.position.y >= e.detail.room.height) {
                        _this.position.y = -size.height;
                    }
                }

                if (wrap_horizontally) {
                    if (_this.position.x + size.width <= 0) {
                        _this.position.x = e.detail.room.width;
                    } else if (_this.position.x >= e.detail.room.width) {
                        _this.position.x = -size.width;
                    }
                }
            });
        }
    });
    exports.default = Trait_MoveWrap;
});
//# sourceMappingURL=move_wrap.js.map