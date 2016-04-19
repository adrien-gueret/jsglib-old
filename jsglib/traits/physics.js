"use strict";

import Trait from "jsglib/core/trait";
import Element from "jsglib/core/element";
import Point from "jsglib/core/point";
import Tile from "jsglib/core/tile";

let Trait_Physics = Trait({
    initPhysics(gravity = new Point(0, 10)) {
        if (!this instanceof Element) {
            throw new TypeError('Trait_Physics: trying to init gravity feature on non-Element instance');
        }

        this.on_ground = false;
        this.gravity = gravity;
        this.$forces = [this.gravity];
        this.$impulses = [];
        this.bounce_factor = new Point();
        this.movements_resistance = new Point(.1, .1);

        this.on('no_solids_collision', () => {
            this.on_ground = false;
        });

        this.on('solids_collision', e => {
            let this_size = this.getSize();
            let center_x = this.getRectangle().getCenter().x;
            let impulse = new Point();

            // Check if element is on ground
            this.on_ground = e.detail.all_solids_collisions.some(solid_data => {
                let solid = solid_data.solid;
                let solid_position = solid_data.position;

                if (solid instanceof Tile) {
                    let contact_y = solid.getContactY(center_x, solid_position);

                    if (isNaN(contact_y)) {
                        return false;
                    }

                    return this.position.y + this_size.height <= contact_y;
                }

                return this.position.y + this_size.height <= solid_position.y;
            });

            e.detail.all_solids_collisions.some(solid_data => {
                let solid = solid_data.solid;
                let solid_size = solid.getSize();
                let solid_position = solid_data.position;

                if (solid_position.y + solid_size.height <= this.position.y) {
                    impulse.y = this.speed.y * this.bounce_factor.y;
                    this.speed.y = this.gravity.y;
                    return true;
                } else if (this.position.y + this_size.height <= solid_position.y) {
                    impulse.y = this.speed.y * this.bounce_factor.y;
                    this.speed.y = this.gravity.y;
                    return true;
                } else if (solid_position.x + solid_size.width <= this.position.x) {
                    impulse.x = this.speed.x * this.bounce_factor.x;
                    this.speed.x = 0;
                    return true;
                } else if (this.position.x + this_size.width <= solid_position.x) {
                    impulse.x = this.speed.x * this.bounce_factor.x;
                    this.speed.x = 0;
                    return true;
                }
            });

            if (impulse.x !== 0 || impulse.y !== 0) {
                this.applyImpulse(impulse.multiply(new Point(-1, -1)));
            }
        });
    },

    // Overwrite move() method for a more complex one
    move(delta_time) {
        let force_acceleration = new Point();

        if (this.$forces.length) {
            this.$forces.forEach(current_force => {
                force_acceleration.add(current_force);
            });
        }

        let impulse = new Point();

        if (this.$impulses.length) {
            this.$impulses.forEach(current_impulse => {
                impulse.add(current_impulse);
            });
        }

        let delta_speed = new Point();

        this.speed.round();

        if (Math.abs(this.speed.x) > Math.abs(this.movements_resistance.x)) {
            delta_speed.x = this.speed.x < 0 ? this.movements_resistance.x : -this.movements_resistance.x;
        } else {
            this.speed.x = 0;
        }

        if (Math.abs(this.speed.y) > Math.abs(this.movements_resistance.y)) {
            delta_speed.y = this.speed.y < 0 ? this.movements_resistance.y : -this.movements_resistance.y;
        } else {
            this.speed.y = 0;
        }

        this.speed.add(delta_speed).add(impulse).add(force_acceleration.add(this.acceleration));

        let delta_position = new Point(delta_time, delta_time);
        this.position.add(this.speed.multiply(delta_position, true));

        this.$impulses.length = 0;

        return this;
    },

    applyImpulse(impulse) {
        this.$impulses.push(impulse);
        return this;
    }
});

export default Trait_Physics;