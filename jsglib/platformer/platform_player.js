"use strict";

import Element from "jsglib/core/element";
import Point from "jsglib/core/point";
import Inputs from "jsglib/core/inputs";
import Trait_Physics from "jsglib/traits/physics";

class PlatformPlayer extends Element {
    constructor(x, y, inputs) {
        super(x, y);

        const MAX_SPEED = this.constructor.MAX_SPEED || PlatformPlayer.MAX_SPEED;
        const ACCELERATION_LIMIT = MAX_SPEED / 4;
        const Y_SPEED_LIMIT = MAX_SPEED * 2;
        const JUMP_VARIATION = MAX_SPEED / ACCELERATION_LIMIT;

        this.stop_on_solids = true;

        this.initPhysics();

        this.movements_resistance.x = 10;

        this.acceleration.minimum(-ACCELERATION_LIMIT).maximum(ACCELERATION_LIMIT);
        this.speed.minimum(-MAX_SPEED, -Y_SPEED_LIMIT).maximum(MAX_SPEED, Y_SPEED_LIMIT * 2);
        this.acceleration_delta = new Point(3, 0);

        inputs.on('keydown', e => {
            if (this.on_ground && e.detail.key === Inputs.KEYS.ARROWS.UP) {
                this.speed.y = 0;
                this.applyImpulse(new Point(0, -Y_SPEED_LIMIT));
            }
        });

        this.on('frame', () => {
            if (inputs.isKeyPressed(Inputs.KEYS.ARROWS.LEFT)) {
                this.acceleration.subtract(this.acceleration_delta);
            } else if (this.acceleration.x < 0) {
                this.acceleration.add(this.acceleration_delta);
                this.acceleration.x = Math.min(0, this.acceleration.x);
            }

            if (inputs.isKeyPressed(Inputs.KEYS.ARROWS.RIGHT)) {
                this.acceleration.add(this.acceleration_delta);
            } else if (this.acceleration.x > 0) {
                this.acceleration.subtract(this.acceleration_delta);
                this.acceleration.x = Math.max(0, this.acceleration.x);
            }

            if (this.speed.y < 0 && inputs.isKeyPressed(Inputs.KEYS.ARROWS.UP)) {
                this.applyImpulse(new Point(0, -JUMP_VARIATION));
            }
        });
    }
}

PlatformPlayer.MAX_SPEED = 80;

// Tell that the Ball class must use the trait "Trait_Physics"
Trait_Physics(PlatformPlayer);

export default PlatformPlayer;