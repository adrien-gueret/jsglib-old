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
        initKeysMap: function initKeysMap(keys_mapping) {
            if (!this instanceof _element2.default) {
                throw new TypeError('Trait_Playable: trying to make playable a non-Element instance');
            }

            this.useKeysMapping(keys_mapping);
        },
        useKeysMapping: function useKeysMapping(keys_mapping) {
            this.$keys_maping = keys_mapping;
            return this;
        },
        isActionKeyPressed: function isActionKeyPressed(inputs, action_name) {
            var keys = this.$keys_maping[action_name] || [];

            if (!(keys instanceof Array)) {
                return inputs.isKeyPressed(keys);
            }

            return keys.some(function (key) {
                return inputs.isKeyPressed(key);
            });
        },
        isKeyBindedToAction: function isKeyBindedToAction(key, action_name) {
            var keys = this.$keys_maping[action_name] || [];

            if (!(keys instanceof Array)) {
                return keys === key;
            }

            return keys.indexOf(key) >= 0;
        }
    });
    exports.default = Trait_KeysMapping;
});
//# sourceMappingURL=keys_mapping.js.map