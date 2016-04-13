"use strict";

import Game from "jsglib/core/game";
import Room from "jsglib/core/room";
import Sprite from "jsglib/core/sprite";
import Tile from "jsglib/core/tile";
import {Link, LinkSprite, LinkSpriteMask} from "./link";
import {Man, ManSprite} from "./man";

class HouseSpriteSheets extends Sprite {}

// Create a new game from a dom element
let my_game = new Game(document.getElementById('myGame'));

// Load all images
Promise
    .all([
        LinkSprite.loadImage('./link.png'),
        LinkSpriteMask.loadImage('./link_mask.png'),
        ManSprite.loadImage('./man.png'),
        HouseSpriteSheets.loadImage('./house_tiles.png')
    ])
    .then(() => {
        // Images are loaded, we can init their Sprite classes
        LinkSpriteMask.init();
        LinkSprite.init(my_game.timer);
        ManSprite.init(my_game.timer);
        HouseSpriteSheets
            .makeTiles(32, 32, 1)
            .defineTilesTypes({
                [Tile.TYPES.SOLID]: [2, 4, 5, 6, 8, 10, 12, 14, 14, 15, 17, 18, 19]
            });

        let level = new Room();

        // Define our level
        level.useDefinition({
            layers: {
                TILES_LAYER: {
                    sprite_class: HouseSpriteSheets,
                    tiles: [
                        [1, 4, 4, 4, 4, 4, 4, 4, 4, 3],
                        [6, 9, 9, 9, 9, 9, 9, 9, 9, 8],
                        [6, 7, 7, 16, 16, 16, 16, 7, 7, 8],
                        [6, 4, 7, 16, 17, 19, 16, 7, 4, 8],
                        [6, 9, 7, 16, 16, 16, 16, 7, 9, 8],
                        [6, 7, 7, 7, 7, 7, 7, 15, 5, 8],
                        [6, 14, 7, 7, 7, 7, 7, 7, 10, 8],
                        [11, 12, 12, 12, 12, 12, 12, 12, 12, 13]
                    ]
                }
            }
        });

        // When level starts, create an instance of Link
        level.on('start', () => {
            new Man(96, 96);
            new Link(128, 160, my_game.inputs);
        });

        // Start the game!
        my_game
            .goToRoom(level)
            .start();
    });
