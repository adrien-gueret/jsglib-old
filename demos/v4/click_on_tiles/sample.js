(JSGLib => {
    const { Game, Sprite, Room, Layer } = JSGLib.Core;

// Create a new game from a dom element
    const my_game = new Game(document.getElementById('myGame'));

// Our game will have only one room
    const level = new Room();

// Define a class inherited from JSGlib Sprite class
    class TilesSprite extends Sprite {
    }

// Load the only image of the game
    TilesSprite.loadImage('./tiles.png')
        .then(() => {
            // Image is loaded, we can create tiles from it
            TilesSprite.makeTiles(32, 32, 0);

            // Randomly generate tiles for room definition
            const TOTAL_COLUMNS = 15;
            const TOTAL_ROWS = 10;
            const tiles = [];

            for (let row_index = 0; row_index < TOTAL_ROWS; row_index++) {
                const row = [];

                for (let column_index = 0; column_index < TOTAL_COLUMNS; column_index++) {
                    const min_tile_number = 2;
                    const max_tile_number = 7;

                    const delta = 1 + max_tile_number - min_tile_number;
                    const random = Math.floor(delta * Math.random()) + min_tile_number;

                    row.push(random);
                }

                tiles[row_index] = row;
            }

            // Instead of using an external file, we provide a plain object for our level definition
            return level.useDefinition({
                "layers": {
                    "TILES_LAYER": {
                        "sprite_class": TilesSprite,
                        "tiles": tiles
                    }
                }
            });
        })
        .then(() => {
            // Level definition is fully loaded, we can go to our room and start the game!
            my_game
                .goToRoom(level)
                .start();

            // When we click on the game...
            my_game.inputs.on('click', (e) => {
                // Get the clicked tile
                const tile = Layer.TILES_LAYER.getTileFromPoint(e.detail.mouse);

                if (!tile) {
                    return;
                }

                // And update its tile number
                if (tile.tile_number > 1) {
                    tile.setTileNumber(tile.tile_number - 1);
                }
            });
        });
})(window.JSGLib);