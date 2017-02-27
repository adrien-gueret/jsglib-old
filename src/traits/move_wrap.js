import Trait from "../core/trait";
import Element from "../core/element";

/**
 * @trait Move_Wrap
 * @description
 * Trait allowing affected elements to switch to opposite side of a room when the go outside it.
 */
const Move_Wrap = Trait({
    /**
     * @method initMoveWrap
     * @public
     * @description Init the "move wrap" feature.
     * @param {Boolean} [wrap_horizontally=true] If `true`, the element will be switch to opposite side if it goes
     * outside the room from the left or from the right.
     * @param {Boolean} [wrap_vertically=true] If `true`, the element will be switch to opposite side if it goes
     * outside the room from the top or from the bottom.
     * @return {Core.Element} This instance.
     * @example myInstance.initMoveWrap();
     * @example myInstance.initMoveWrap(false);
     * @example myInstance.initMoveWrap(true, false);
     */
    initMoveWrap(wrap_horizontally = true, wrap_vertically = true) {
        if (!this instanceof Element) {
            throw new TypeError('Trait Move_Wrap: trying to init move wrap feature on non-Element instance');
        }

        // When instance leaves the room, move it to the opposite side of the room
        this.on('leave_room', (e) => {
            let size = this.getSize();

            if (wrap_vertically) {
                if (this.position.y + size.height <= 0) {
                    this.position.y = e.detail.room.height;
                } else if (this.position.y >= e.detail.room.height) {
                    this.position.y = -size.height;
                }
            }

            if (wrap_horizontally) {
                if (this.position.x + size.width <= 0) {
                    this.position.x = e.detail.room.width;
                } else if (this.position.x >= e.detail.room.width) {
                    this.position.x = -size.width;
                }
            }
        });

        return this;
    }
});

export default Move_Wrap;