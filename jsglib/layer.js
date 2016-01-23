"use strict";

class Layer {
    constructor(name) {
        this.name = name;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.setAttribute('data-name', this.name);
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = 0;
        this.canvas.style.top = 0;
        this.canvas.style.zIndex = 0;

        this.tiles_sprite = null;
        this.tiles = [];
    }

    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        return this;
    }

    setZindex(new_zindex) {
        this.canvas.style.zIndex = new_zindex;
        return this;
    }

    getTileFromPoint(point) {
        if (!this.tiles_sprite) {
            return null;
        }

        let tiles_size = this.tiles_sprite.getTilesSize();
        let row = this.tiles[Math.floor(point.y / tiles_size.height)];

        if (!row) {
            return null;
        }

        return row[Math.floor(point.x / tiles_size.width)] || null;
    }

    draw(timer, force_redraw = false) {
        this.tiles.forEach((row, row_index) => {
            row.forEach((tile, column_index) => {
                // Draw tile only if we need it
                if (!force_redraw && !tile.needs_redraw) {
                    return;
                }

                tile.needs_redraw = false;
                tile.clear(this.ctx, column_index, row_index);

                // If empty tile, we skip it
                if (tile.is_empty) {
                    return;
                }

                tile.draw(this.ctx, column_index, row_index, timer);
            });
        });

        return this;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return this;
    }
}
Layer.MAIN_LAYER = new Layer('MAIN_LAYER');
Layer.TILES_LAYER = new Layer('TILES_LAYER');
Layer.BACKGROUND_LAYER = new Layer('BACKGROUND_LAYER');

export default Layer;