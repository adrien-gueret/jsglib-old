"use strict";

import Game from "jsglib/core/game";
import Sprite from "jsglib/core/sprite";
import Room from "jsglib/core/room";
import Layer from "jsglib/core/layer";

// Define a class inherited from JSGlib Sprite class
class MainTilesSprite extends Sprite {
    static initTiles(timer) {
        // Tell that spritesheets will have 32px*32px tiles.
        this.makeTiles(32, 32);
        // Tiles 6 & 14 should be switched to each others for the water animation
        this.defineTilesAnimations([{
            tiles: [6, 14],
            time: 500
        }], timer);
        return this;
    }
}

// Define two classes inherited from our custom Sprite class
class TilesPlainSprite extends MainTilesSprite {
}
class TilesSnowSprite extends MainTilesSprite {
}

// Create a new game from a dom element
var my_game = new Game(document.getElementById('myGame'));

// Since we use our tiles classes in an external file (level.json),
// we need to register them in order to be able to access them
my_game.registerClass(TilesPlainSprite);
my_game.registerClass(TilesSnowSprite);

// Our game will have only one room
var level1 = new Room();

// Load images
Promise.all([
        TilesPlainSprite.loadImage('./tiles_plain.png'),
        TilesSnowSprite.loadImage('./tiles_snow.png')
    ])
    .then(() => {
        // Images are loaded, we can define tiles
        TilesPlainSprite.initTiles(my_game.timer);
        TilesSnowSprite.initTiles(my_game.timer);

        // Then we can tell our room to use the level definition from level.json file
        return level1.useDefinition('./level.json');
    })
    .then(() => {
        // Level definition is fully loaded, we can go to our room and start the game!
        my_game
            .goToRoom(level1)
            .start();

        // When we click on the game...
        my_game.inputs.on('click', () => {
            // Toggle spritesheets to use
            let used_sprite_class = Layer.TILES_LAYER.tiles_sprite_class;
            let new_sprite_class = used_sprite_class === TilesPlainSprite ? TilesSnowSprite : TilesPlainSprite;
            Layer.TILES_LAYER.tiles_sprite_class = new_sprite_class;

            Layer.TILES_LAYER.tiles.forEach(row => {
                row.forEach(tile => {
                    if (!tile.sprite_class) {
                        return;
                    }

                    tile.sprite_class = new_sprite_class;
                });
            });

            // Then force redrawing of the layer displaying tiles
            Layer.TILES_LAYER.draw(my_game.timer, true);
        });
    });