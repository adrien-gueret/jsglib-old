"use strict";

import EventsHandler from "jsglib/events_handler";
import Point from "jsglib/point";

class Tile extends EventsHandler {
    constructor(sprite_class, x = 0, y = 0, tile_number = 0) {
        super();

        this.sprite_class = sprite_class;
        this.position = new Point(x, y);
        this.tile_number = tile_number;
        this.needs_redraw = true;
        this.clock_animation = null;
        this.is_empty = false;
    }

    static getNewEmptyTile(sprite_class) {
        let tile = new Tile(sprite_class);
        tile.is_empty = true;
        return tile;
    }

    clone() {
        let new_tile = new Tile(this.sprite_class, this.position.x, this.position.y, this.tile_number);

        if (this.animation) {
            let {next_tile_number, time} = this.animation;
            new_tile.animation = {next_tile_number, time};
        }

        return new_tile;
    }

    setTileNumber(tile_number) {
        this.trigger('clear_animation');

        let tile = this.sprite_class.getTile(tile_number);
        this.is_empty = tile.is_empty;
        this.tile_number = tile_number;
        this.position = tile.position;
        this.animation = tile.animation;
        this.needs_redraw = true;

        return this;
    }

    draw(ctx, x = 0, y = 0, timer) {
        let tiles_size = {
            width: this.sprite_class.tiles_width,
            height: this.sprite_class.tiles_height
        };

        let dest_x = x * tiles_size.height;
        let dest_y = y * tiles_size.width;

        ctx.drawImage(
            this.sprite_class.image,
            this.position.x,
            this.position.y,
            tiles_size.width,
            tiles_size.height,
            dest_x,
            dest_y,
            tiles_size.width,
            tiles_size.height
        );

        if (this.animation) {
            this.trigger('clear_animation');

            this.clock_animation = timer.setTimeout(() => {
                this.setTileNumber(this.animation.next_tile_number);
            }, this.animation.time);

            this.off('clear_animation').on('clear_animation', () => {
                if (this.clock_animation) {
                    timer.clearTimeout(this.clock_animation);
                    this.clock_animation = null;
                }
            });
        }

        return this;
    }

    clear(ctx, x, y) {
        let tiles_size = {
            width: this.sprite_class.tiles_width,
            height: this.sprite_class.tiles_height
        };

        let dest_x = x * tiles_size.height;
        let dest_y = y * tiles_size.width;

        ctx.clearRect(dest_x, dest_y, tiles_size.width, tiles_size.height);
        return this;
    }

    setAnimation(next_tile_number, time) {
        this.animation = {next_tile_number, time};
        return this;
    }
}

export default Tile;