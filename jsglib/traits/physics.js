"use strict";

import Trait from "jsglib/core/trait";
import Element from "jsglib/core/element";
import Point from "jsglib/core/point";

let Trait_Physics = Trait({
    initPhysics(gravity = new Point(0, 10)) {
        if (!this instanceof Element) {
            throw new TypeError('Trait_Physics: trying to init gravity feature on non-Element instance');
        }

        this.$forces = [gravity];
        this.$impulses = [];
        this.bounce_factor = new Point(0);

        this.on('solids_collision', (e) => {
            let this_size = this.getSize();
            let impulse = new Point();

            e.detail.tiles.some(tile_data => {
                let tile_position = tile_data.position;
                let tile_size = tile_data.tile.getSize();

                if (tile_position.y + tile_size.height <= this.position.y) {
                    impulse.y = this.speed.y * this.bounce_factor.y;
                    this.speed.y = 0;
                    return true;
                } else if (this.position.y + this_size.height <= tile_position.y) {
                    impulse.y = this.speed.y * this.bounce_factor.y;
                    this.speed.y = 0;
                    return true;
                } else if (tile_position.x + tile_size.width <= this.position.x) {
                    impulse.x = this.speed.x * this.bounce_factor.x;
                    this.speed.x = 0;
                    return true;
                } else if (this.position.x + this_size.width <= tile_position.x) {
                    impulse.x = this.speed.x * this.bounce_factor.x;
                    this.speed.x = 0;
                    return true;
                }
            });

            this.applyImpulse(impulse.multiply(new Point(-1, -1)));
        });
    },

    // Overwrite move() method for a more complex one
    move(delta_time) {
        this.acceleration = new Point();

        if (this.$forces.length) {
            this.acceleration = this.$forces.reduce((force1, force2) => {
                return force1.add(force2, true);
            });
        }

        let impulse = new Point();

        if (this.$impulses.length) {
            impulse = this.$impulses.reduce((impulse1, impulse2) => {
                return impulse1.add(impulse2, true);
            });
        }

        this.speed.add(impulse).add(this.acceleration);

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