"use strict";

import Element from "jsglib/core/element";

class RpgInteractive extends Element {
    constructor(x, y) {
        super(x, y);

        this.is_solid = true;
        this.stop_on_solids = true;
    }

    performInteraction() {

    }
}

export default RpgInteractive;