

[&lt; Back](./README.md)

# *trait* Keys_Mapping

Trait adding methods to maps some actions to keyboard events.

## Properties:

* **Object** *$keys_mapping* Object storing actions names mapped to keyboards keys: `{ jumpAction: [ Inputs.KEYS.ARROWS.UP, Inputs.KEYS.SPACE ] }`

<a name="toc_initKeysMap"></a><a name="toc_isActionKeyPressed"></a><a name="toc_isKeyBindedToAction"></a><a name="toc_useKeysMapping"></a>

## Public methods:
* [initKeysMap](#initKeysMap)(keys_mapping)
* [isActionKeyPressed](#isActionKeyPressed)(inputs, action_name)
* [isKeyBindedToAction](#isKeyBindedToAction)(key, action_name)
* [useKeysMapping](#useKeysMapping)(keys_mapping)

___

## <a name="initKeysMap"></a>*public*  initKeysMap(keys_mapping) [:arrow_heading_up:](#toc_initKeysMap)

Init the key mapping.

### Params:

* **Object** *keys_mapping* Object storing actions names mapped to keyboards keys.

### Return:

**[Element](./../core/element.md)** This instance.

### Example:
```js
myInstance.initKeysMap({ jumpAction: [ Inputs.KEYS.ARROWS.UP, Inputs.KEYS.SPACE ] });
```

## <a name="useKeysMapping"></a>*public*  useKeysMapping(keys_mapping) [:arrow_heading_up:](#toc_useKeysMapping)

Update the key mapping.

### Params:

* **Object** *keys_mapping* Object storing actions names mapped to keyboards keys.

### Return:

**[Element](./../core/element.md)** This instance.

### Example:
```js
myInstance.useKeysMapping({ jumpAction: [ Inputs.KEYS.ARROWS.UP, Inputs.KEYS.SPACE ] });
```

## <a name="isActionKeyPressed"></a>*public*  isActionKeyPressed(inputs, action_name) [:arrow_heading_up:](#toc_isActionKeyPressed)

Checks if given Inputs object has a pressed key corresponding to given action.

### Params:

* **[Inputs](./../core/inputs.md)** *inputs* The Inputs object to check on.
* **String** *action_name* Name of the action to check.

### Return:

**Boolean** `true` if a key corresponding to given action is pressed. `false` otherwise.

### Example:
```js
if (myInstance.isActionKeyPressed(myGame.inputs, 'jumpAction') {
 // A key for "jumpAction" is pressed
}
```

## <a name="isKeyBindedToAction"></a>*public*  isKeyBindedToAction(key, action_name) [:arrow_heading_up:](#toc_isKeyBindedToAction)

Checks if given key is binded to given action name.

### Params:

* **Number** *key* Key to check.
* **String** *action_name* Name of the action to check.

### Return:

**Boolean** `true` if a this key is binded to this action. `false` otherwise.

### Example:
```js
if (myInstance.isKeyBindedToAction(Inputs.KEYS.ARROWS.UP, 'jumpAction') {
 // Given key is binded to "jumpAction"
}
```

[&lt; Back](./README.md)
