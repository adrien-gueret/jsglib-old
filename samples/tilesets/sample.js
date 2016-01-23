"use strict";

import Game from "jsglib/game";
import Sprite from "jsglib/sprite";
import Room from "jsglib/room";
import Layer from "jsglib/layer";

class MainTilesSprite extends Sprite {
    static initTiles() {
        this.makeTiles(32, 32)
            .defineTilesAnimations({
                tiles: [6, 14],
                time: 500
            });
        return this;
    }
}

class TilesPlainSprite extends MainTilesSprite {
}
class TilesSnowSprite extends MainTilesSprite {
}

var my_game = new Game(document.getElementById('myGame'));
my_game.registerClass(TilesPlainSprite);
my_game.registerClass(TilesSnowSprite);

var level1 = new Room();

Promise.all([
        TilesPlainSprite.loadImage('./tiles_plain.png'),
        TilesSnowSprite.loadImage('./tiles_snow.png')
    ])
    .then(() => {
        TilesPlainSprite.initTiles();
        TilesSnowSprite.initTiles();
        return level1.useDefinition('./level.json');
    })
    .then(() => {
        my_game
            .goToRoom(level1)
            .start();

        my_game.container.onclick = () => {
            let used_sprite = Layer.TILES_LAYER.tiles_sprite;
            let new_sprite_class = used_sprite instanceof TilesPlainSprite ? TilesSnowSprite : TilesPlainSprite;
            Layer.TILES_LAYER.tiles_sprite = new new_sprite_class();

            Layer.TILES_LAYER.tiles.forEach(row => {
                row.forEach(tile => {
                    if (!tile.sprite_class) {
                        return;
                    }

                    tile.sprite_class = new_sprite_class;
                });
            });

            Layer.TILES_LAYER.draw(my_game.timer, true);
        };
    });