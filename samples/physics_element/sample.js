"use strict";

import Game from "jsglib/game";
import Room from "jsglib/room";
import Sprite from "jsglib/sprite";
import Tile from "jsglib/tile";
import {Ball, BallSprite} from "./ball";

class TilesSprite extends Sprite {
}

// Create a new game from a dom element
let my_game = new Game(document.getElementById('myGame'));

// Load images
Promise.all([
        BallSprite.loadImage('./ball.png'),
        TilesSprite.loadImage('./tiles.png')
    ])
    .then(() => {
        TilesSprite
            .makeTiles(32, 32, 1)
            .defineTilesTypes({
                // The 13 first tiles of the sheet are solid (only clouds are not)
                [Tile.TYPES.SOLID]: new Array(13).fill(0).map((value, index) => index + 1)
            });

        // Our game will have only one room
        let level = new Room();

        // Define our level
        level.useDefinition({
            layers: {
                TILES_LAYER: {
                    sprite_class: TilesSprite,
                    tiles: [
                        [4, 12, 12, 12, 12, 12, 12, 12, 12, 5],
                        [8, 0, 0, 0, 0, 0, 0, 0, 0, 6],
                        [8, 14, 15, 0, 0, 0, 0, 0, 0, 6],
                        [8, 0, 0, 0, 0, 0, 0, 0, 0, 6],
                        [8, 0, 0, 0, 0, 0, 14, 15, 0, 6],
                        [8, 0, 0, 0, 0, 0, 0, 0, 0, 6],
                        [8, 0, 0, 1, 2, 2, 3, 0, 0, 6],
                        [9, 2, 2, 10, 7, 7, 9, 2, 2, 10]
                    ]
                }
            }
        });

        // When level will start, create a new instance of our element
        level.on('start', () => {
            new Ball(my_game);
        });

        my_game
            .goToRoom(level)
            .start();
    });