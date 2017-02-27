import Events_Handler from './events_handler';
import Keys_Mapping from './keys_mapping';
import Move_Wrap from './move_wrap';

/**
 * @namespace Traits
 * @description Collection of traits usable by classes.
 * @property {Traits.Events_Handler} Events_Handler Trait adding events related features, in order to be able to listen and trigger custom events.
 * @property {Traits.Keys_Mapping} Keys_Mapping Trait adding methods to maps some actions to keyboard events.
 * @property {Traits.Move_Wrap} Move_Wrap Trait allowing affected elements to switch to opposite side of a room when the go outside it.
 * @example
 * import { Traits } from 'jsglib';
 * console.log(Traits);
 * @example
 * const { Events_Handler, Move_Wrap } = JSGLib.Traits;
 */
export default {
    Events_Handler,
    Keys_Mapping,
    Move_Wrap,
};