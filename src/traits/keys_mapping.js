"use strict";

import Trait from "../core/trait";
import Element from "../core/element";

let Trait_KeysMapping = Trait({
    initKeysMap(keys_mapping) {
        if (!this instanceof Element) {
            throw new TypeError('Trait_Playable: trying to make playable a non-Element instance');
        }

        this.useKeysMapping(keys_mapping);
    },

    useKeysMapping(keys_mapping) {
        this.$keys_maping = keys_mapping;
        return this;
    },

    isActionKeyPressed(inputs, action_name) {
        let keys = this.$keys_maping[action_name] || [];

        if (!(keys instanceof Array)) {
            return inputs.isKeyPressed(keys);
        }

        return keys.some(key => inputs.isKeyPressed(key));
    },

    isKeyBindedToAction(key, action_name) {
        let keys = this.$keys_maping[action_name] || [];

        if (!(keys instanceof Array)) {
            return keys === key;
        }

        return keys.indexOf(key) >= 0;
    }
});

export default Trait_KeysMapping;