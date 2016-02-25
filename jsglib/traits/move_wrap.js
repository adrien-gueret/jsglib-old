"use strict";

import Trait from "jsglib/core/trait";
import Element from "jsglib/core/element";

let Trait_MoveWrap = Trait({
    initMoveWrap(wrap_horizontally = true, wrap_vertically = true) {
        if (!this instanceof Element) {
            throw new TypeError('Trait_MoveWrap: trying to init move wrap feature on non-Element instance');
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
    }
});

export default Trait_MoveWrap;