"use strict";

import Game from "jsglib/game";
import Room from "jsglib/room";
import Layer from "jsglib/layer";
import GameControllor from "./controllor";
import {BigHeadsSprite, SmallHeadsSprite} from "./sprites";

// Create a new game from a dom element
let game_container = document.getElementById('myGame');
let big_head_container = document.getElementById('big_head');
let timer_container = document.getElementById('timer');
let points_container = document.getElementById('points');

let my_game = new Game(game_container);

// Our game will have only one room. We won't use any definitions, we simply provide its size
let level = new Room(256, 192);

// When level will start, create a new instance of our element
level.on('start', () => {
    game_container.style.display = 'block';

    let controllor = new GameControllor(
        my_game.timer, {
            width: level.width,
            height: level.height
        });

    controllor
        .on('next_level', (e) => {
            points_container.innerHTML = e.detail.points;
            Layer.MAIN_LAYER.elements.forEach(element => element.destroy());
        })
        .on('change_character', (e) => {
            big_head_container.style.backgroundPosition = e.detail.backgroundPosition;
        })
        .on('update_timer', (e) => {
            timer_container.innerHTML = e.detail.timer;
        })
        .on('stop_timer', () => {
            Layer.MAIN_LAYER.elements
                .filter(element => !controllor.checkIsWanted(element))
                .forEach(element => element.destroy());

            my_game.stop();
        })
        .start();
});

Promise.all([
        SmallHeadsSprite.loadImage('./small_heads.png'),
        BigHeadsSprite.loadImage('./big_heads.png')
    ])
    .then(() => {
        SmallHeadsSprite.init();
        BigHeadsSprite.init();

        my_game
            .goToRoom(level)
            .start();
    });