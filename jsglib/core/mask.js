"use strict";

import Rectangle from "jsglib/core/rectangle";

class Mask extends Rectangle {
    constructor(width = 0, height = 0, position = undefined, is_solid = false, stop_on_solids = false) {
        super(width, height, position);
        this.is_solid = is_solid;
        this.stop_on_solids = stop_on_solids;
    }

    static createFromRectangle(rectangle, is_solid = false, stop_on_solids = false) {
        return new Mask(
            rectangle.width,
            rectangle.height,
            undefined,
            is_solid,
            stop_on_solids
        );
    }

    clone() {
        return new Mask(this.width, this.height, this.position, this.is_solid, this.stop_on_solids);
    }
}

export default Mask;