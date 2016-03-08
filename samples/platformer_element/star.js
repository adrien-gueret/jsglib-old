"use strict";

import Element from "jsglib/core/element";
import Layer from "jsglib/core/layer";
import Sprite from "jsglib/core/sprite";

// Sprite class for stars
export class StarSprite extends Sprite {
}

export class Star extends Element {
    constructor(x, y) {
        // We must call the parent's constructor
        super(x, y);

        // Indicate the sprite class to use
        this.setSpriteClass(StarSprite);

        // Add player to layer in order to display it
        Layer.MAIN_LAYER.addElement(this);

        this.setUpAnimation();
    }

    setUpAnimation() {
        this.useAnimation('main', 100, false);
        this.current_animation.on('animation_end', () => {
            this.current_animation.timer.setTimeout(() => this.setUpAnimation(), 1000);
        });
    }
}