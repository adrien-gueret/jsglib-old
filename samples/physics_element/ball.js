"use strict";

import Element from "jsglib/element";
import Inputs from "jsglib/inputs";
import Layer from "jsglib/layer";
import Sprite from "jsglib/sprite";
import Point from "jsglib/point";
import {random} from "jsglib/utils";
import Trait_Physics from "jsglib/traits/physics";

// Sprite class defining tiles and animations for the ball
export class BallSprite extends Sprite {
}

class Ball extends Element {
    constructor(game) {
        // We must call the parent's constructor
        super();

        // Tell that this instance must not move on solids
        this.stop_on_solids = true;

        // Indicate the sprite class to use
        this.setSpriteClass(BallSprite);

        // Set an initial position (center horizontally the new ball)
        let {height, width} = this.getSize();
        this.position.set(game.current_room.width / 2 - width / 2, height);

        // TODO: for gravity, check for a combinaison Point/Force to move to

        // Init physics on this instance thanks to Trait_Physics!
        this.initPhysics();

        // Set this ball bounce factor (property from Trait_Physics)
        this.bounce_factor.set(.8);

        game.inputs
            .on('click', (e) => {
                // On click on the game, get the difference between the mouse and the ball position
                let element_mouse_delta_position = this.getRectangle().getCenter().subtract(e.detail.mouse);

                // Multiply this difference by 5 and set some limits to it
                let impulse = new Point(5, 5)
                    .multiply(element_mouse_delta_position)
                    .minimum(-200)
                    .maximum(200);

                // Apply this impulse to the ball (once again, applyImpulse is defined by Trait_Physics)
                this.applyImpulse(impulse);
            });

        // Add player to layer in order to display it
        Layer.MAIN_LAYER.addElement(this);
    }
}

// Tell that the Ball class must use the trait "Trait_Physics"
Trait_Physics(Ball);

export {Ball as Ball};