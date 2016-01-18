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

    draw(timer, force_redraw = false) {
        this.tiles.forEach((row, row_index) => {
            row.forEach((tile, column_index) => {
                // If empty tile, we skip it
                if (!tile || !tile.sprite_class) {
                    return;
                }

                // Draw tile only if we need it
                if (!force_redraw && !tile.needs_redraw) {
                    return;
                }

                tile
                    .draw(this.ctx, column_index, row_index, timer)
                    .on('animation', () => {
                        this.tiles[row_index][column_index] = tile.sprite_class.getTile(tile.animation.next_tile_number);
                        tile.off('animaiton');
                    });
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