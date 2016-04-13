"use strict";

import RpgInteractive from "jsglib/rpg/rpg_interactive";
import Layer from "jsglib/core/layer";
import Sprite from "jsglib/core/sprite";

// Sprite class defining tiles and animations for the NPC character
export class ManSprite extends Sprite {
    static init(timer) {
        this
            .makeTiles(26, 32, 2)
            .defineTilesAnimations([
                {
                    name: 'walk_down',
                    tiles: [1, 2],
                    time: 250
                },
                {
                    name: 'walk_left',
                    tiles: [5, 6],
                    time: 250
                },
                {
                    name: 'walk_up',
                    tiles: [7, 8],
                    time: 250
                },
                {
                    name: 'walk_right',
                    tiles: [3, 4],
                    time: 250
                }
            ], timer);
    }
}

export class Man extends RpgInteractive {
    constructor(x, y) {
        // We must call the parent's constructor
        super(x, y);

        // Add player to layer in order to display it
        Layer.MAIN_LAYER.addElement(this);

        this.setSpriteClass(ManSprite);

        this.useAnimation('walk_down');
    }
}