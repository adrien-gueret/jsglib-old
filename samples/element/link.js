"use strict";

import Element from "jsglib/element";
import Inputs from "jsglib/inputs";
import Layer from "jsglib/layer";
import Sprite from "jsglib/sprite";

// Sprite class defining tiles and animations for Link
export class LinkSprite extends Sprite {
    static init(timer) {
        this
            .makeTiles(32, 32, 2)
            .defineTilesAnimations([
                {
                    name: 'walk_bottom',
                    tiles: [1, 2],
                    time: 150
                },
                {
                    name: 'walk_left',
                    tiles: [3, 4],
                    time: 150
                },
                {
                    name: 'walk_top',
                    tiles: [5, 6],
                    time: 150
                },
                {
                    name: 'walk_right',
                    tiles: [7, 8],
                    time: 150
                }
            ], timer);
    }
}

export class Link extends Element {
    constructor(x, y, game) {
        // We must call the parent's constructor
        super(x, y);

        this.setSpriteClass(LinkSprite);

        game.inputs
            .on('keydown', (e) => {
                // Do nothing if pressed key is not an arrow
                if (!e.detail.is_arrow) {
                    return;
                }

                e.preventDefault();

                // Update Link's animation
                this.switchAnimationByKey(e.detail.key);
            })
            .on('keyup', (e) => {
                // Do nothing if released key is not an arrow
                if (!e.detail.is_arrow) {
                    return;
                }

                // Check if another arrow key is still pressed
                for (let key_name in Inputs.KEYS.ARROWS) {
                    let key = Inputs.KEYS.ARROWS[key_name];
                    if (game.inputs.isKeyPressed(key)) {
                        this.switchAnimationByKey(key);
                        return;
                    }
                }

                // No arrows keys are pressed: we stop the animation
                this.setCurrentTileNumber(this.current_animation.tiles_numbers[0]);
                this.current_animation.stop();
            });

        this.on('frame', () => {
            // On each frame, move player according to pressed keys
            if (game.inputs.isKeyPressed(Inputs.KEYS.ARROWS.LEFT)) {
                this.position.x -= 3;
            }

            if (game.inputs.isKeyPressed(Inputs.KEYS.ARROWS.RIGHT)) {
                this.position.x += 3;
            }

            if (game.inputs.isKeyPressed(Inputs.KEYS.ARROWS.UP)) {
                this.position.y -= 3;
            }

            if (game.inputs.isKeyPressed(Inputs.KEYS.ARROWS.DOWN)) {
                this.position.y += 3;
            }
        });

        // Add player to layer in order to display it
        Layer.MAIN_LAYER.addElement(this);
    }

    switchAnimationByKey(key) {
        switch (key) {
            case Inputs.KEYS.ARROWS.LEFT:
                this.useAnimation('walk_left');
                break;

            case Inputs.KEYS.ARROWS.UP:
                this.useAnimation('walk_top');
                break;

            case Inputs.KEYS.ARROWS.RIGHT:
                this.useAnimation('walk_right');
                break;

            case Inputs.KEYS.ARROWS.DOWN:
                this.useAnimation('walk_bottom');
                break;
        }

        return this;
    }
}