(function(window) {
    "use strict";

    let JSGlib = window.JSGlib || {};

	class Sprite {
		constructor() {
			this.image = this.constructor.image;
		}
		getTilesSize() {
			return this.constructor.getTilesSize();
		}
		static getTilesSize() {
			return {
				width: this.tiles_width || 0,
				height: this.tiles_height || 0
			};
		}
		static getTile(tile_number, clone = true) {
			tile_number--;

			if (tile_number < 0) {
				return new JSGlib.Tile(null);
			}

			let tiles = this.tiles;
			let total_columns = tiles[0].length;

			let row_index = Math.floor(tile_number / total_columns);
			let column_index = tile_number % total_columns;

			let tile = tiles[row_index][column_index];

			if ( ! tile) {
				return new JSGlib.Tile(null);
			}

			return clone ? tiles[row_index][column_index].clone() : tiles[row_index][column_index];
		}
        static loadImage(url) {
            let promise = (resolve, reject) => {
				this.image = new Image();

				this.image.onload = () => {
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

			for (let j = 0; j < image_height; j += tiles_height) {
				let x = j / tiles_height;
				this.tiles[x] = [];

				for (let i = 0; i < image_width; i += tiles_width) {
					this.tiles[x][i / tiles_width] = new JSGlib.Tile(
						this,
						i + tiles_separation * (i / tiles_width),
						j + tiles_separation * (j / tiles_height)
					);
					image_width -= tiles_separation;
				}
				image_width = this.image.naturalWidth;
				image_height -= tiles_separation;
			}

			return this;
		}
		static defineTilesAnimations(...animations) {
			for (let animation of animations) {
				animation.tiles.forEach((tile_number, index) => {
					let current_animated_tile = this.getTile(tile_number, false);
					let next_tile_number = animation.tiles[index + 1] || animation.tiles[0];

					current_animated_tile.setAnimation(next_tile_number, animation.time);
				});
			}

			return this;
		}
		static defineTilesTypes(...types) {
			for (let type of types) {
				// TODO
			}

			return this;
		}
    }

	Sprite.TILES_TYPES = {
		WALL: Symbol()
	};

	JSGlib.Sprite = Sprite;

    window.JSGlib = JSGlib;
})(window);