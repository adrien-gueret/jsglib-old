"use strict";

import Game from "jsglib/game";
import Room from "jsglib/room";
import {Link, LinkSprite} from "./link";

// Create a new game from a dom element
let my_game = new Game(document.getElementById('myGame'));

// Our game will have only one room. We won't use any definitions, we simply provide its size
let level = new Room(512, 320);

// When level will start, create a new instance of our element
level.on('start', () => {
    new Link(64, 64, my_game);
});

// Load Link's image
LinkSprite.loadImage('./link.png')
    .then(() => {
        LinkSprite.init(my_game.timer);

        my_game
            .goToRoom(level)
            .start();
    });