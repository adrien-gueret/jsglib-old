"use strict";

import Game from "jsglib/core/game";
import Room from "jsglib/core/room";
import Sprite from "jsglib/core/sprite";
import Tile from "jsglib/core/tile";
import Point from "jsglib/core/point";
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
            })
            .defineTilesSlopes({
                // Define slopes on some tiles
                16: new Point(16, 0),
                18: new Point(31, 16)
            });

        // Our game will have only one room
        let level = new Room();

        // Define our level
        level.useDefinition({
            layers: {
                TILES_LAYER: {
                    sprite_class: TilesSprite,
                    tiles: [
                        [4, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 5],
                        [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 0, 6],
                        [8, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
                        [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 16, 2, 2, 2, 2, 10],
                        [9, 2, 3, 0, 0, 0, 14, 15, 0, 18, 16, 17, 7, 7, 7, 7, 7, 7],
                        [7, 7, 8, 0, 0, 0, 0, 1, 2, 17, 7, 7, 7, 7, 7, 7, 7, 7],
                        [7, 7, 8, 0, 0, 0, 0, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                        [7, 7, 9, 2, 2, 2, 2, 10, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
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