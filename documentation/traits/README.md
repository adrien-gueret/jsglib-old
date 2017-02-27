

[&lt; Back](../README.md)

# *namespace* Traits

Collection of traits usable by classes.

## Properties:

* **[Events_Handler](./../traits/events_handler.md)** *Events_Handler* Trait adding events related features, in order to be able to listen and trigger custom events.
* **[Keys_Mapping](./../traits/keys_mapping.md)** *Keys_Mapping* Trait adding methods to maps some actions to keyboard events.
* **[Move_Wrap](./../traits/move_wrap.md)** *Move_Wrap* Trait allowing affected elements to switch to opposite side of a room when the go outside it.

### Examples:
* Example 1
```js
import { Traits } from 'jsglib';
console.log(Traits);
```
* Example 2
```js
const { Events_Handler, Move_Wrap } = JSGLib.Traits;
```

___

[&lt; Back](../README.md)
