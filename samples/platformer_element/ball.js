"use strict";

import PlatformPlayer from "jsglib/platformer/platform_player";
import Layer from "jsglib/core/layer";
import Sprite from "jsglib/core/sprite";
import {Star} from "./star";

// Sprite class for the ball
export class BallSprite extends Sprite {
}

export class Ball extends PlatformPlayer {
    constructor(x, y, game) {
        // We must call the parent's constructor
        super(x, y, game.inputs);

        // Indicate the sprite class to use
        this.setSpriteClass(BallSprite);

        // @TODO: check why animations of ALL stars is stopped
        this.onCollision(Star, element => element.destroy());

        // Add player to layer in order to display it
        Layer.MAIN_LAYER.addElement(this);
    }
}