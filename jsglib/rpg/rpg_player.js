"use strict";

import {DIRECTIONS} from "jsglib/rpg/rpg_core";
import Element from "jsglib/core/element";
import Point from "jsglib/core/point";
import Inputs from "jsglib/core/inputs";
import Trait_KeysMapping from "jsglib/traits/keys_mapping";

class RpgPlayer extends Element {
    constructor(x, y, inputs) {
        super(x, y);

        const SPEED = this.constructor.SPEED || RpgPlayer.SPEED;

        this.stop_on_solids = true;

        // Attach keyboards events
        inputs
            .on('keyup', e => {
                // Do nothing if released key is not a moving one
                if (!this.isMovingKey(e.detail.key)) {
                    return;
                }

                // Check if another moving key is still pressed
                let pressed_moving_keys = inputs.keys_pressed.filter(key => this.isMovingKey(key));

                this.trigger('rpg.moving_key_up', {
                    key: e.detail.key,
                    pressed_moving_key: pressed_moving_keys[0] || null
                });
            });

        // Other specific events related to this current instance
        this
            .on('frame', () => {
                // On each frame, update instance's speeds according to pressed keys
                if (this.isActionKeyPressed(inputs, RpgPlayer.ACTIONS.MOVE_LEFT)) {
                    this.speed.x = -SPEED;
                } else if (this.isActionKeyPressed(inputs, RpgPlayer.ACTIONS.MOVE_RIGHT)) {
                    this.speed.x = SPEED;
                } else {
                    this.speed.x = 0;
                }

                if (this.isActionKeyPressed(inputs, RpgPlayer.ACTIONS.MOVE_UP)) {
                    this.speed.y = -SPEED;
                } else if (this.isActionKeyPressed(inputs, RpgPlayer.ACTIONS.MOVE_DOWN)) {
                    this.speed.y = SPEED;
                } else {
                    this.speed.y = 0;
                }
            })
            .on('solids_collision', e => {
                let elements = e.detail.elements.map(element => ({position: element.position, element}));
                let solids = e.detail.tiles.concat(elements);
                let this_size = this.getSize();

                solids.some(solid_data => {
                    let solid = solid_data.tile || solid_data.element;
                    let solid_size = solid.getSize();
                    let solid_position = solid_data.position;
                    let event_data = {
                        solid,
                        solid_position,
                        is_tile: !!solid_data.tile
                    };

                    if (solid_position.y + solid_size.height <= this.position.y) {
                        event_data.direction = DIRECTIONS.UP;
                    } else if (this.position.y + this_size.height <= solid_position.y) {
                        event_data.direction = DIRECTIONS.DOWN;
                    } else if (solid_position.x + solid_size.width <= this.position.x) {
                        event_data.direction = DIRECTIONS.LEFT;
                    } else if (this.position.x + this_size.width <= solid_position.x) {
                        event_data.direction = DIRECTIONS.RIGHT;
                    }

                    let custom_event = this.trigger('rpg.solid_collision', event_data);
                    return custom_event.propagationStopped;
                });
            });
    }

    isMovingKey(key) {
        return this.isKeyBindedToAction(key, RpgPlayer.ACTIONS.MOVE_LEFT) ||
            this.isKeyBindedToAction(key, RpgPlayer.ACTIONS.MOVE_RIGHT) ||
            this.isKeyBindedToAction(key, RpgPlayer.ACTIONS.MOVE_UP) ||
            this.isKeyBindedToAction(key, RpgPlayer.ACTIONS.MOVE_DOWN);
    }
}

RpgPlayer.SPEED = 100;
RpgPlayer.ACTIONS = {
    MOVE_LEFT: Symbol(),
    MOVE_RIGHT: Symbol(),
    MOVE_UP: Symbol(),
    MOVE_DOWN: Symbol(),
    MOVE_ACTION_1: Symbol(),
    MOVE_ACTION_2: Symbol()
};

Trait_KeysMapping(RpgPlayer);

export default RpgPlayer;