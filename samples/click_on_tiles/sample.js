"use strict";

import Game from "jsglib/game";
import Sprite from "jsglib/sprite";
import Room from "jsglib/room";
import Layer from "jsglib/layer";

var my_game = new Game(document.getElementById('myGame'));

var level = new Room();

class TilesSprite extends Sprite {
}

TilesSprite.loadImage('./tiles.png')
    .then(() => {
        TilesSprite.makeTiles(32, 32, 0);

        const TOTAL_COLUMNS = 15;
        const TOTAL_ROWS = 10;
        let tiles = [];

        for (let row_index = 0; row_index < TOTAL_ROWS; row_index++) {
            let row = [];

            for (let column_index = 0; column_index < TOTAL_COLUMNS; column_index++) {
                let min_tile_number = 2;
                let max_tile_number = 7;

                let delta = 1 + max_tile_number - min_tile_number;
                let random = Math.floor(delta * Math.random()) + min_tile_number;

                row.push(random);
            }

            tiles[row_index] = row;
        }

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
        my_game
            .goToRoom(level)
            .start();

        my_game.inputs.on('click', (e) => {
            let tile = Layer.TILES_LAYER.getTileFromPoint(e.detail.mouse);

            if (!tile) {
                return;
            }

            if (tile.tile_number > 1) {
                tile.setTileNumber(tile.tile_number - 1);
            }
        });
    });