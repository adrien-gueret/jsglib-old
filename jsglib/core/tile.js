"use strict";

import Point from "jsglib/core/point";
import Trait_EventsHandler from "jsglib/traits/events_handler";

class Tile {
    constructor(sprite_class, x = 0, y = 0, tile_number = 0, type = null, slope_point = null) {
        this.sprite_class = sprite_class;
        this.sheet_position = new Point(x, y);
        this.tile_number = tile_number;
        this.needs_redraw = true;
        this.is_empty = false;
        this.type = type;
        this.slope_point = slope_point;
    }

    static getNewEmptyTile(sprite_class) {
        let tile = new Tile(sprite_class);
        tile.is_empty = true;
        return tile;
    }

    getSize() {
        return this.sprite_class.getTilesSize();
    }

    clone() {
        return new Tile(
            this.sprite_class,
            this.sheet_position.x,
            this.sheet_position.y,
            this.tile_number,
            this.type,
            this.slope_point
        );
    }

    setTileNumber(tile_number) {
        let tile = this.sprite_class.getTile(tile_number);
        this.is_empty = tile.is_empty;
        this.tile_number = tile_number;
        this.sheet_position = tile.sheet_position;
        this.type = tile.type;
        this.slope_point = tile.slope_point;
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
            this.sheet_position.x,
            this.sheet_position.y,
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

    isSolid() {
        return this.type === Tile.TYPES.SOLID || this.isSlope();
    }

    isSlope() {
        return this.slope_point !== null;
    }

    isEndSlope() {
        return this.isSlope() && (this.slope_point.x === 0 || this.slope_point.y === 0);
    }

    getContactY(x, tile_position) {
        let x_on_tile = this.getXOnTile(x, tile_position.x);
        let y_on_tile = this.getYFromSlope(x_on_tile);

        if (isNaN(y_on_tile)) {
            return NaN;
        }

        return tile_position.y + y_on_tile;
    }

    getXOnTile(target_x, tile_x) {
        return (target_x - tile_x) / this.getSize().width;
    }

    getYFromSlope(x_on_tile) {
        if (!this.isSlope()) {
            return 0;
        }

        if (x_on_tile < 0 || x_on_tile > 1) {
            return NaN;
        }

        return (1 - x_on_tile) * this.slope_point.x + x_on_tile * this.slope_point.y;
    }
}

Tile.TYPES = {
    SOLID: Symbol(),
    SLOPE: Symbol()
};

Trait_EventsHandler(Tile);

export default Tile;