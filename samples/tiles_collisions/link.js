"use strict";

import {DIRECTIONS} from "jsglib/rpg/rpg_core";
import RpgPlayer from "jsglib/rpg/rpg_player";
import Inputs from "jsglib/core/inputs";
import Layer from "jsglib/core/layer";
import Sprite from "jsglib/core/sprite";

// Sprite class defining tiles and animations for Link
export class LinkSprite extends Sprite {
    static init(timer) {
        this
            .makeTiles(32, 32, 2)
            .defineTilesAnimations([
                {
                    name: 'walk_down',
                    tiles: [1, 2],
                    time: 150
                },
                {
                    name: 'walk_left',
                    tiles: [3, 4],
                    time: 150
                },
                {
                    name: 'walk_up',
                    tiles: [5, 6],
                    time: 150
                },
                {
                    name: 'walk_right',
                    tiles: [7, 8],
                    time: 150
                },
                {
                    name: 'push_down',
                    tiles: [9, 10],
                    time: 150
                },
                {
                    name: 'push_left',
                    tiles: [11, 12],
                    time: 150
                },
                {
                    name: 'push_up',
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

export class Link extends RpgPlayer {
    constructor(x, y, game) {
        // We must call the parent's constructor
        super(x, y, game.inputs);

        // Tell which Sprite class to use for displaying
        this.setSpriteClass(LinkSprite);

        // RpgPlayer uses Trait_KeysMapping: we can bind keys to some actions
        // Here, we allow moving with arrows or ZQSD
        this.initKeysMap({
            [RpgPlayer.ACTIONS.MOVE_LEFT]: [Inputs.KEYS.ARROWS.LEFT, Inputs.KEYS.Q],
            [RpgPlayer.ACTIONS.MOVE_RIGHT]: [Inputs.KEYS.ARROWS.RIGHT, Inputs.KEYS.D],
            [RpgPlayer.ACTIONS.MOVE_UP]: [Inputs.KEYS.ARROWS.UP, Inputs.KEYS.Z],
            [RpgPlayer.ACTIONS.MOVE_DOWN]: [Inputs.KEYS.ARROWS.DOWN, Inputs.KEYS.S]
        });

        // == Events definitions ==
        this.on('rpg.solid_collision', e => {
                // We want to handle collision only on first collided solid found
                e.stopPropagation();

                // Use a "push" animation on solid collision
                switch (e.detail.direction) {
                    case DIRECTIONS.UP:
                        this.useAnimation('push_up');
                        break;

                    case DIRECTIONS.DOWN:
                        this.useAnimation('push_down');
                        break;

                    case DIRECTIONS.LEFT:
                        this.useAnimation('push_left');
                        break;

                    case DIRECTIONS.RIGHT:
                        this.useAnimation('push_right');
                        break;
                }
            })
            .on('no_solids_collision', () => {
                // When Link has no collisions with solids, if it's pushing,
                // change its "push" animation to the corresponding "walk" one
                switch (this.getAnimationName()) {
                    case 'push_left':
                        this.useAnimation('walk_left');
                        break;
                    case 'push_up':
                        this.useAnimation('walk_up');
                        break;
                    case 'push_right':
                        this.useAnimation('walk_right');
                        break;
                    case 'push_down':
                        this.useAnimation('walk_down');
                        break;
                }
            })
            .on('rpg.moving_key_up', e => {
                if (e.detail.pressed_moving_key) {
                    this.switchAnimationByKey(e.detail.pressed_moving_key);
                    return;
                }

                // No moving keys are pressed: we stop the animation
                this.switchAnimationByKey(e.detail.key);
                this.setCurrentTileNumber(this.current_animation.tiles_numbers[0]);
                this.current_animation.stop();
            });

        game.inputs.on('keydown', e => {
            // Do nothing if released key is not a moving one
            if (!this.isMovingKey(e.detail.key)) {
                return;
            }

            // Update player animation if he's not pushing walls
            if (this.getAnimationName().indexOf('push') === -1) {
                this.switchAnimationByKey(e.detail.key);
            }
        });

        // Add player to layer in order to display it
        Layer.MAIN_LAYER.addElement(this);
    }

    // Custom method for this class: it updates Link's animation according to pressed moving key
    switchAnimationByKey(key) {
        if (this.isKeyBindedToAction(key, RpgPlayer.ACTIONS.MOVE_LEFT)) {
            this.useAnimation('walk_left');
        } else if (this.isKeyBindedToAction(key, RpgPlayer.ACTIONS.MOVE_UP)) {
            this.useAnimation('walk_up');
        } else if (this.isKeyBindedToAction(key, RpgPlayer.ACTIONS.MOVE_RIGHT)) {
            this.useAnimation('walk_right');
        } else if (this.isKeyBindedToAction(key, RpgPlayer.ACTIONS.MOVE_DOWN)) {
            this.useAnimation('walk_down');
        }

        return this;
    }
}

Link.SPEED = 80;