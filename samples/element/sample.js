"use strict";

import Game from "jsglib/game";
import Room from "jsglib/room";
import {Link, LinkSprite} from "./link";

let my_game = new Game(document.getElementById('myGame'));
let level = new Room(512, 320);

level.on('start', () => {
    new Link(64, 64, my_game);
});


LinkSprite.loadImage('./link.png')
    .then(() => {
        LinkSprite.init(my_game.timer);

        my_game
            .goToRoom(level)
            .start();
    });