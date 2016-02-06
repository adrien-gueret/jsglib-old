"use strict";

import Point from 'jsglib/point';

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

        this.tiles_sprite_class = null;
        this.needs_clear = false;
        this.tiles = [];
        this.elements = [];
        this.tiles_animations = [];
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
        if (!this.tiles_sprite_class) {
            return null;
        }

        let tiles_size = this.tiles_sprite_class.getTilesSize();
        let row = this.tiles[Math.floor(point.y / tiles_size.height)];

        if (!row) {
            return null;
        }

        return row[Math.floor(point.x / tiles_size.width)] || null;
    }

    getTilesFromRectangle(rectangle) {
        let tiles = [];

        if (!this.tiles_sprite_class) {
            return tiles;
        }

        let tiles_size = this.tiles_sprite_class.getTilesSize();
        let x_min = Math.floor(rectangle.position.x / tiles_size.width);
        let y_min = Math.floor(rectangle.position.y / tiles_size.height);
        let x_max = Math.floor((rectangle.position.x + rectangle.width - 1) / tiles_size.width);
        let y_max = Math.floor((rectangle.position.y + rectangle.height - 1) / tiles_size.height);

        for (let x = x_min; x <= x_max; x++) {
            for (let y = y_min; y <= y_max; y++) {
                let row = this.tiles[y];

                if (!row) {
                    continue;
                }

                let tile = row[x];

                if (tile) {
                    tiles.push({
                        tile,
                        position: new Point(x * tiles_size.width, y * tiles_size.height)
                    });
                }
            }
        }

        return tiles;
    }

    getAllTilesFromNumber(tile_number) {
        let tiles = [];

        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                if (tile.tile_number === tile_number) {
                    tiles.push(tile);
                }
            });
        });

        return tiles;
    }

    addElement(element) {
        if (element.layer) {
            element.layer.removeElement(element);
        }

        element.layer = this;
        this.elements.push(element);
        this.needs_clear = true;

        return this;
    }

    removeElement(element_to_remove) {
        this.elements.some((element, element_index) => {
            if (element === element_to_remove) {
                this.elements.splice(element_index, 1);
                element_to_remove.layer = null;
                this.needs_clear = true;
                return true;
            }
        });

        return this;
    }

    clearTilesAnimations() {
        this.tiles_animations.forEach((animation) => {
            animation.stop();
        });
        this.tiles_animations = [];
        return this;
    }

    initTilesAnimations(timer) {
        if (!this.tiles_sprite_class) {
            throw new Error('Layer.initTilesAnimation: this layer has no Sprite class for its tiles.');
        }

        var keys = Array.prototype.concat(
            Object.getOwnPropertyNames(this.tiles_sprite_class.animations),
            Object.getOwnPropertySymbols(this.tiles_sprite_class.animations)
        );

        keys.forEach((key) => {
            let animation_class = this.tiles_sprite_class.animations[key];
            let animation = new animation_class(timer);
            this.tiles_animations.push(animation);

            animation
                .on('animation_udpate', () => {
                    this.getAllTilesFromNumber(animation.getPreviousTileNumber()).forEach((tile) => {
                        tile.setTileNumber(animation.getCurrentTileNumber());
                    });
                })
                .start();
        });

        return this;
    }

    draw(force_redraw = false) {
        if (this.tiles.length) {
            this.tiles.forEach((row, row_index) => {
                row.forEach((tile, column_index) => {
                    // Draw tile only if we need it
                    if (!force_redraw && !tile.needs_redraw) {
                        return;
                    }

                    let tiles_size = {
                        width: tile.sprite_class.tiles_width,
                        height: tile.sprite_class.tiles_height
                    };

                    let dest_x = column_index * tiles_size.width;
                    let dest_y = row_index * tiles_size.height;

                    tile.needs_redraw = false;
                    tile.clear(this.ctx, dest_x, dest_y);

                    // If empty tile, we skip it
                    if (tile.is_empty) {
                        return;
                    }

                    tile.draw(this.ctx, dest_x, dest_y);
                });
            });

            return this;
        }

        // No tiles layer: draw elements if any
        if (!force_redraw) {
            return this;
        }

        this.elements.forEach((element) => {
            element.draw(this.ctx);
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