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
                },
                {
                    name: 'push_bottom',
                    tiles: [9, 10],
                    time: 150
                },
                {
                    name: 'push_left',
                    tiles: [11, 12],
                    time: 150
                },
                {
                    name: 'push_top',
                    tiles: [13, 14],
                    time: 150
                },
                {
                    name: 'push_right',
                    tiles: [15, 16],
                    time: 150
                }
            ], timer);
    }
}

const LINK_SPEED = 70;
export class Link extends Element {
    constructor(x, y, game) {
        // We must call the parent's constructor
        super(x, y);

        // Tell which Sprite class to use for displaying
        this.setSpriteClass(LinkSprite);

        // Tell that this instance must not move on solids
        this.stop_on_solids = true;

        // Attach keyboards events
        game.inputs
            .on('keydown', (e) => {
                // Do nothing if pressed key is not an arrow
                if (!e.detail.is_arrow) {
                    return;
                }

                e.preventDefault();

                // Update Link's animation if he's not pushing walls
                if (this.getAnimationName().indexOf('push') === -1) {
                    this.switchAnimationByKey(e.detail.key);
                }
            })
            .on('keyup', (e) => {
                // Do nothing if released key is not an arrow
                if (!e.detail.is_arrow) {
                    return;
                }

                // Check if another arrow key is still pressed
                let pressed_arrows = game.inputs.getPressedArrows();

                if (pressed_arrows.length) {
                    return this.switchAnimationByKey(pressed_arrows[0]);
                }

                // No arrows keys are pressed: we stop the animation
                this.switchAnimationByKey(e.detail.key);
                this.setCurrentTileNumber(this.current_animation.tiles_numbers[0]);
                this.current_animation.stop();
            });

        // Other specific events related to this current instance
        this
            .on('frame', () => {
                // On each frame, update instance's speeds according to pressed keys
                if (game.inputs.isKeyPressed(Inputs.KEYS.ARROWS.LEFT)) {
                    this.speed.x = -LINK_SPEED;
                } else if (game.inputs.isKeyPressed(Inputs.KEYS.ARROWS.RIGHT)) {
                    this.speed.x = LINK_SPEED;
                } else {
                    this.speed.x = 0;
                }

                if (game.inputs.isKeyPressed(Inputs.KEYS.ARROWS.UP)) {
                    this.speed.y = -LINK_SPEED;
                } else if (game.inputs.isKeyPressed(Inputs.KEYS.ARROWS.DOWN)) {
                    this.speed.y = LINK_SPEED;
                } else {
                    this.speed.y = 0;
                }
            })
            .on('tile_collision', (e) => {
                // On collision with solids, use "push" animation according to collided tile position
                if (e.detail.tile_data.tile.isSolid()) {
                    let this_size = this.getSize();
                    let tile_size = e.detail.tile_data.tile.getSize();
                    let tile_position = e.detail.tile_data.position;

                    if (tile_position.y + tile_size.height <= this.position.y) {
                        this.useAnimation('push_top');
                        e.stopPropagation();
                    } else if (this.position.y + this_size.height <= tile_position.y) {
                        this.useAnimation('push_bottom');
                        e.stopPropagation();
                    } else if (tile_position.x + tile_size.width <= this.position.x) {
                        this.useAnimation('push_left');
                        e.stopPropagation();
                    } else if (this.position.x + this_size.width <= tile_position.x) {
                        this.useAnimation('push_right');
                        e.stopPropagation();
                    }
                }
            })
            .on('no_solids_collision', () => {
                // When the instance has no collisions with solids, if it's pushing,
                // change its "push" animation to the corresponding "walk" one
                switch (this.getAnimationName()) {
                    case 'push_left':
                        this.useAnimation('walk_left');
                        break;
                    case 'push_top':
                        this.useAnimation('walk_top');
                        break;
                    case 'push_right':
                        this.useAnimation('walk_right');
                        break;
                    case 'push_bottom':
                        this.useAnimation('walk_bottom');
                        break;
                }
            });

        // Add player to layer in order to display it
        Layer.MAIN_LAYER.addElement(this);
    }

    // Custom method for this class: it updates Link's animation according to pressed arrow key
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