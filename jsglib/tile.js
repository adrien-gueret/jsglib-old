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
        this.is_empty = false;
    }

    static getNewEmptyTile(sprite_class) {
        let tile = new Tile(sprite_class);
        tile.is_empty = true;
        return tile;
    }

    clone() {
        return new Tile(this.sprite_class, this.position.x, this.position.y, this.tile_number);
    }

    setTileNumber(tile_number) {
        let tile = this.sprite_class.getTile(tile_number);
        this.is_empty = tile.is_empty;
        this.tile_number = tile_number;
        this.position = tile.position;
        this.needs_redraw = true;

        return this;
    }

    draw(ctx, x = 0, y = 0) {
        let tiles_size = {
            width: this.sprite_class.tiles_width,
            height: this.sprite_class.tiles_height
        };

        ctx.drawImage(
            this.sprite_class.image,
            this.position.x,
            this.position.y,
            tiles_size.width,
            tiles_size.height,
            x,
            y,
            tiles_size.width,
            tiles_size.height
        );

        this.trigger('drawn');

        return this;
    }

    clear(ctx, x, y) {
        let tiles_size = {
            width: this.sprite_class.tiles_width,
            height: this.sprite_class.tiles_height
        };

        ctx.clearRect(x, y, tiles_size.width, tiles_size.height);
        return this;
    }

    setAnimation(next_tile_number, time) {
        this.animation = {next_tile_number, time};
        return this;
    }
}

export default Tile;