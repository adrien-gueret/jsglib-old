"use strict";

import Game from "jsglib/game";
import Room from "jsglib/room";
import Sprite from "jsglib/sprite";
import Tile from "jsglib/tile";
import {Link, LinkSprite} from "./link";

class HouseSpriteSheets extends Sprite {}

let my_game = new Game(document.getElementById('myGame'));

Promise
    .all([
        LinkSprite.loadImage('./link.png'),
        HouseSpriteSheets.loadImage('./house_tiles.png')
    ])
    .then(() => {
        LinkSprite.init(my_game.timer);
        HouseSpriteSheets
            .makeTiles(32, 32, 1)
            .defineTilesTypes({
                [Tile.TYPES.SOLID]: [2, 4, 5, 6, 8, 10, 12, 14, 14, 15, 17, 18, 19]
            });

        let level = new Room();
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

        level.on('start', () => {
            new Link(128, 160, my_game);
        });

        my_game
            .goToRoom(level)
            .start();
    });
