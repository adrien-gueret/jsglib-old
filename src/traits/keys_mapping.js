import Trait from "../core/trait";
import Element from "../core/element";

/**
 * @trait Keys_Mapping
 * @description
 * Trait adding methods to maps some actions to keyboard events.
 * @property {Object} $keys_mapping Object storing actions names mapped to keyboards keys:
 * `{ jumpAction: [ Inputs.KEYS.ARROWS.UP, Inputs.KEYS.SPACE ] }`
 */
const Keys_Mapping = Trait({
    /**
     * @method initKeysMap
     * @public
     * @description Init the key mapping.
     * @param {Object} keys_mapping Object storing actions names mapped to keyboards keys.
     * @return {Core.Element} This instance.
     * @example
     * myInstance.initKeysMap({ jumpAction: [ Inputs.KEYS.ARROWS.UP, Inputs.KEYS.SPACE ] });
     */
    initKeysMap(keys_mapping) {
        if (!this instanceof Element) {
            throw new TypeError('Trait Keys_Mapping: trying to make playable a non-Element instance');
        }

        this.useKeysMapping(keys_mapping);
    },

    /**
     * @method useKeysMapping
     * @public
     * @description Update the key mapping.
     * @param {Object} keys_mapping Object storing actions names mapped to keyboards keys.
     * @return {Core.Element} This instance.
     * @example
     * myInstance.useKeysMapping({ jumpAction: [ Inputs.KEYS.ARROWS.UP, Inputs.KEYS.SPACE ] });
     */
    useKeysMapping(keys_mapping) {
        this.$keys_mapping = keys_mapping;
        return this;
    },

    /**
     * @method isActionKeyPressed
     * @public
     * @description Checks if given Inputs object has a pressed key corresponding to given action.
     * @param {Core.Inputs} inputs The Inputs object to check on.
     * @param {String} action_name Name of the action to check.
     * @return {Boolean} `true` if a key corresponding to given action is pressed. `false` otherwise.
     * @example
     * if (myInstance.isActionKeyPressed(myGame.inputs, 'jumpAction') {
     *  // A key for "jumpAction" is pressed
     * }
     */
    isActionKeyPressed(inputs, action_name) {
        let keys = this.$keys_mapping[action_name] || [];

        if (!(keys instanceof Array)) {
            return inputs.isKeyPressed(keys);
        }

        return keys.some(key => inputs.isKeyPressed(key));
    },

    /**
     * @method isKeyBindedToAction
     * @public
     * @description Checks if given key is binded to given action name.
     * @param {Number} key Key to check.
     * @param {String} action_name Name of the action to check.
     * @return {Boolean} `true` if a this key is binded to this action. `false` otherwise.
     * @example
     * if (myInstance.isKeyBindedToAction(Inputs.KEYS.ARROWS.UP, 'jumpAction') {
     *  // Given key is binded to "jumpAction"
     * }
     */
    isKeyBindedToAction(key, action_name) {
        let keys = this.$keys_mapping[action_name] || [];

        if (!(keys instanceof Array)) {
            return keys === key;
        }

        return keys.indexOf(key) >= 0;
    }
});

export default Keys_Mapping;