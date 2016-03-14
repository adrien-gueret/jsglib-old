define(["exports", "jsglib/core/trait", "jsglib/core/element", "jsglib/core/inputs"], function (exports, _trait, _element, _inputs) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _trait2 = _interopRequireDefault(_trait);

    var _element2 = _interopRequireDefault(_element);

    var _inputs2 = _interopRequireDefault(_inputs);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var Trait_KeysMapping = (0, _trait2.default)({
        initPlayable: function initPlayable(inputs, keys_mapping) {
            if (!this instanceof _element2.default) {
                throw new TypeError('Trait_Playable: trying to make playable a non-Element instance');
            }

            this.$inputs = inputs;
            this.useKeysMapping(keys_mapping);
        },
        useKeysMapping: function useKeysMapping(keys_mapping) {
            this.$keys_maping = keys_mapping;
            return this;
        },
        isActionKeyPressed: function isActionKeyPressed(action_name) {
            var _this = this;

            var keys = this.$keys_maping[action_name] || [];

            if (!(keys instanceof Array)) {
                return this.$inputs.isKeyPressed(keys);
            }

            return keys.some(function (key) {
                return _this.$inputs.isKeyPressed(key);
            });
        }
    });
    exports.default = Trait_KeysMapping;
});
//# sourceMappingURL=playable.js.map