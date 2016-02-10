"use strict";

import Element from "jsglib/element";
import Utils from "jsglib/utils";
import Head from "./head";
import {BigHeadsSprite, SmallHeadsSprite, CHARACTERS_NUMBERS} from "./sprites";

export default class GameControllor extends Element {
    constructor(game_timer, room_size) {
        // We must call the parent's constructor
        super();

        this.game_timer = game_timer;
        this.room_size = room_size;
        this.points = 0;
        this.total_heads = 5;
        this.time_counter = 30;

        this.setSpriteClass(BigHeadsSprite, CHARACTERS_NUMBERS.NONE);
    }

    start() {
        this.updateTimer();
        this.changeCharacter();
        this.launchTimer(this.game_timer);
    }

    launchTimer(timer) {
        timer.setTimeout(() => {
            this.time_counter--;
            this.updateTimer();

            if (this.time_counter) {
                this.launchTimer(timer);
            } else {
                this.trigger('stop_timer');
            }

        }, 1000);
    }

    updateTimer() {
        let timer = this.time_counter >= 10 ? this.time_counter : '0' + this.time_counter;
        this.trigger('update_timer', {timer});
    }

    changeCharacter() {
        let new_tile_number = this.current_tile.tile_number;

        while (new_tile_number === this.current_tile.tile_number) {
            new_tile_number = Utils.random(1, 4);
        }

        this.current_tile.setTileNumber(new_tile_number);

        let backgroundPosition = `-${this.current_tile.sheet_position.x}px ${this.current_tile.sheet_position.y}px`;

        this.trigger('change_character', {backgroundPosition});

        this.generateHeads();
    }

    generateHeads() {
        let characters = [
            CHARACTERS_NUMBERS.LUIGI,
            CHARACTERS_NUMBERS.MARIO,
            CHARACTERS_NUMBERS.YOSHI,
            CHARACTERS_NUMBERS.WARIO
        ].filter(number => number !== this.current_tile.tile_number);

        let numbers = [this.current_tile.tile_number];

        for (let total = 0, max = this.total_heads - 1; total < max; total++) {
            numbers.push(characters[Utils.random(0, 2)]);
        }

        Utils.shuffleArray(numbers).forEach(number => {
            let head = new Head(this.room_size, number);

            head.on('click', (e) => {
                if (this.checkIsWanted(head)) {
                    e.stopPropagation();
                    this.total_heads += 5;
                    this.trigger('next_level', {
                        points: ++this.points
                    });
                    this.changeCharacter();
                }
            });
        });
    }

    checkIsWanted(element) {
        return this.current_tile.tile_number === element.current_tile.tile_number;
    }
}