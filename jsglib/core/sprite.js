"use strict";

import Tile from "jsglib/core/tile";
import Animation from "jsglib/core/animation";

class Sprite {
    static getTilesSize() {
        return {
            width: this.tiles_width || 0,
            height: this.tiles_height || 0
        };
    }

    static hasTiles() {
        return this.tiles.length > 0;
    }

    static getTile(tile_number, clone = true) {
        tile_number--;

        if (!this.hasTiles() || tile_number < 0) {
            return Tile.getNewEmptyTile(this);
        }

        let tiles = this.tiles;
        let total_columns = tiles[0].length;

        let row_index = Math.floor(tile_number / total_columns);
        let column_index = tile_number % total_columns;

        let tile = tiles[row_index] ? tiles[row_index][column_index] : null;

        if (!tile) {
            return Tile.getNewEmptyTile(this);
        }

        return clone ? tiles[row_index][column_index].clone() : tiles[row_index][column_index];
    }

    static loadImage(url) {
        let promise = (resolve, reject) => {
            this.image = new Image();

            this.image.onload = () => {
                this.makeTiles(this.image.naturalWidth, this.image.naturalHeight, 0);
                resolve(this.image);
            };

            this.image.onerror = reject;
            this.image.src = url;
        };

        return new Promise(promise);
    }

    static makeTiles(tiles_width = 16, tiles_height = 16, tiles_separation = 1) {
        if (!this.image) {
            throw ReferenceError(this.name + '.makeTiles(): image not found for this class');
        }

        this.tiles = [];
        this.tiles_width = tiles_width;
        this.tiles_height = tiles_height;
        this.tiles_separation = tiles_separation;

        let image_width = this.image.naturalWidth;
        let image_height = this.image.naturalHeight;
        let tile_number = 1;

        for (let j = 0; j < image_height; j += tiles_height) {
            let x = j / tiles_height;
            this.tiles[x] = [];

            for (let i = 0; i < image_width; i += tiles_width) {
                this.tiles[x][i / tiles_width] = new Tile(
                    this,
                    i + tiles_separation * (i / tiles_width),
                    j + tiles_separation * (j / tiles_height),
                    tile_number++
                );
                image_width -= tiles_separation;
            }
            image_width = this.image.naturalWidth;
            image_height -= tiles_separation;
        }

        return this;
    }

    static defineTilesAnimations(animations, timer) {
        this.animations = {};

        animations.forEach((animation) => {
            this.animations[animation.name || Symbol()] = Animation.define(timer, animation.tiles, animation.time, animation.name);
        });

        return this;
    }

    static getAnimationClass(animation_name) {
        return this.animations[animation_name] || null;
    }

    static defineTilesTypes(types) {
        var keys = Array.prototype.concat(
            Object.getOwnPropertyNames(types),
            Object.getOwnPropertySymbols(types)
        );

        keys.forEach((type_name) => {
            let tiles_numbers = types[type_name];
            tiles_numbers.forEach((tile_number) => {
                let tile = this.getTile(tile_number, false);
                tile.type = type_name;
            });
        });

        return this;
    }

    static defineTilesSlopes(slopes_definitions) {
        for(let tile_number in slopes_definitions) {
            let tile = this.getTile(tile_number, false);
            tile.type = Tile.TYPES.SLOPE;
            tile.slope_point = slopes_definitions[tile_number];
        }
        return this;
    }
}

Sprite.image = null;
Sprite.tiles = [];
Sprite.tiles_width = 0;
Sprite.tiles_height = 0;
Sprite.animations = {};

export default Sprite;