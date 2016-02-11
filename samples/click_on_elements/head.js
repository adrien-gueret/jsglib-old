"use strict";

import Element from "jsglib/element";
import Layer from "jsglib/layer";
import {random, shuffleArray} from "jsglib/utils";
import {SmallHeadsSprite} from "./sprites";

function getRandomSpeed() {
    const speeds = shuffleArray([0, 20, 30, 40, 50]);
    let speed = speeds[0];

    return random(0, 1) ? speed : -speed;
}

export default class Head extends Element {
    constructor(room_size, tile_number) {
        // Randomly position the head
        let head_size = SmallHeadsSprite.getTilesSize();
        let x = random(0, room_size.width - head_size.width);
        let y = random(0, room_size.height - head_size.height);

        super(x, y);

        // Randomly set this head speed
        this.speed.set(getRandomSpeed(), getRandomSpeed());

        this.setSpriteClass(SmallHeadsSprite, tile_number);

        // When head leaves the room, move it to the opposite side of the room
        this.on('leave_room', (e) => {
            if (this.position.y + head_size.height <= 0) {
                this.position.y = e.detail.room.height;
            } else if (this.position.y >= e.detail.room.height ) {
                this.position.y = - head_size.height;
            }

            if (this.position.x + head_size.width <= 0) {
                this.position.x = e.detail.room.width;
            } else if (this.position.x >= e.detail.room.width ) {
                this.position.x = - head_size.width;
            }
        });

        // Add player to layer in order to display it
        Layer.MAIN_LAYER.addElement(this);
    }
}