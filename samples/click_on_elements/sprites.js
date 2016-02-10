"use strict";

import Sprite from "jsglib/sprite";

export const CHARACTERS_NUMBERS = {
    LUIGI: 1,
    MARIO: 2,
    YOSHI: 3,
    WARIO: 4,
    NONE: 5
};

export class BigHeadsSprite extends Sprite {
    static init() {
        this.makeTiles(55, 60);
    }
}

export class SmallHeadsSprite extends Sprite {
    static init() {
        this.makeTiles(30, 32);
    }
}