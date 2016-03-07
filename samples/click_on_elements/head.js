"use strict";

import Element from "jsglib/core/element";
import Layer from "jsglib/core/layer";
import {random, shuffleArray} from "jsglib/core/utils";
import Trait_MoveWrap from "jsglib/traits/move_wrap";
import {SmallHeadsSprite} from "./sprites";

function getRandomSpeed() {
    const speeds = shuffleArray([0, 20, 30, 40, 50]);
    let speed = speeds[0];

    return random(0, 1) ? speed : -speed;
}

class Head extends Element {
    constructor(room_size, tile_number) {
        // Randomly position the head
        let head_size = SmallHeadsSprite.getTilesSize();
        let x = random(0, room_size.width - head_size.width);
        let y = random(0, room_size.height - head_size.height);

        super(x, y);

        // Randomly set this head speed
        this.speed.set(getRandomSpeed(), getRandomSpeed());

        this.setSpriteClass(SmallHeadsSprite, tile_number);

        // Thanks to Trait_MoveWrap, tell the head to wrap its position when leaving room
        this.initMoveWrap();

        // Add player to layer in order to display it
        Layer.MAIN_LAYER.addElement(this);
    }
}

Trait_MoveWrap(Head);

export default Head;