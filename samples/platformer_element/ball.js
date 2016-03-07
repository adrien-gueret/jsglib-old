"use strict";

import PlatformPlayer from "jsglib/platformer/platform_player";
import Layer from "jsglib/core/layer";
import Sprite from "jsglib/core/sprite";

// Sprite class for the ball
export class BallSprite extends Sprite {
}

export class Ball extends PlatformPlayer {
    constructor(game) {
        // We must call the parent's constructor
        super(0, 0, game.inputs);

        // Indicate the sprite class to use
        this.setSpriteClass(BallSprite);

        // Set an initial position (center horizontally the new ball)
        let {height, width} = this.getSize();
        this.position.set(game.current_room.width / 2 - width / 2, height);

        // Add player to layer in order to display it
        Layer.MAIN_LAYER.addElement(this);
    }
}