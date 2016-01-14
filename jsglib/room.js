(function(window) {
    "use strict";

    let JSGlib = window.JSGlib || {};

    class Room extends JSGlib.EventsHandler {
        constructor(width = 0, height = 0) {
            super();
			this.width = width;
			this.height = height;
			this.definition = null;
        }
		initRoom(game) {
			if ( ! this.definition) {
				return this;
			}

			if (this.definition.layers) {
				this.width = 0;
				this.height = 0;

				for (let layer_name in this.definition.layers) {
					let definition = this.definition.layers[layer_name];
					let layer = game.getLayerFromName(layer_name);
					layer.tiles_sprite = null;
					layer.tiles = [];

					if (definition.tiles) {
						let SpriteClass = game.getClass(definition.sprite_class);
						layer.tiles_sprite = new SpriteClass();

						definition.tiles.forEach((row, row_index) => {
							layer.tiles[row_index] = layer.tiles[row_index] || [];

							row.forEach((tile_number, column_index) => {
								layer.tiles[row_index][column_index] = SpriteClass.getTile(tile_number);
							});
						});

						let tiles_size = layer.tiles_sprite.getTilesSize();
						this.width = Math.max(this.width, layer.tiles[0].length * tiles_size.width);
						this.height = Math.max(this.height, layer.tiles.length * tiles_size.height);
					}
				}
			} else {
				this.width = this.definition.width;
				this.height = this.definition.height;
			}

			return this;
		}
        useDefinition(data) {
			let promise = (resolve) => {
				if (typeof data === 'string') {
					JSGlib.http.get(data, {data_type: JSGlib.http.DATA_TYPES.JSON}).then(data => {
						this.definition = data;
						resolve();
					});
				} else {
					this.definition = data;
					resolve();
				}
			};

			return new Promise(promise);
        }
    }

	JSGlib.Room = Room;

    window.JSGlib = JSGlib;
})(window);