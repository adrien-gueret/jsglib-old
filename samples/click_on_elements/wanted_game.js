"use strict";

import Game from "jsglib/game";
import Utils from "jsglib/utils";
import Head from "./head";
import {BigHeadsSprite, SmallHeadsSprite, CHARACTERS_NUMBERS} from "./sprites";

export default class WantedGame extends Game {
    constructor(game_container) {
        // We must call the parent's constructor
        super(game_container);

        // Init some values
        this.points = 0;
        this.total_heads = 5;
        this.time_counter = 30;

        // Launch game on start
        this.on('start', () => {
            this.wanted_tile = BigHeadsSprite.getTile(CHARACTERS_NUMBERS.NONE);

            this.updateTimer();
            this.changeCharacter();
            this.launchTimer();
        });
    }

    // Recursive method in order to update timer
    launchTimer() {
        this.timer.setTimeout(() => {
            this.time_counter--;
            this.updateTimer();

            if (this.time_counter) {
                this.launchTimer(this.timer);
            } else {
                this.trigger('stop_timer');
            }

        }, 1000);
    }

    // Format timer counter and send it via a custom event
    updateTimer() {
        let timer = this.time_counter >= 10 ? this.time_counter : '0' + this.time_counter;
        this.trigger('update_timer', {timer});
    }

    // Get a new character to find and generate heads for the next round
    changeCharacter() {
        let new_tile_number = this.wanted_tile.tile_number;

        // Be sure to not have the same character to find twice in a row
        while (new_tile_number === this.wanted_tile.tile_number) {
            new_tile_number = Utils.random(1, 4);
        }

        this.wanted_tile.setTileNumber(new_tile_number);

        let backgroundPosition = `-${this.wanted_tile.sheet_position.x}px ${this.wanted_tile.sheet_position.y}px`;
        this.trigger('change_character', {backgroundPosition});

        this.generateHeads();
    }

    generateHeads() {
        let characters = [
            CHARACTERS_NUMBERS.LUIGI,
            CHARACTERS_NUMBERS.MARIO,
            CHARACTERS_NUMBERS.YOSHI,
            CHARACTERS_NUMBERS.WARIO
        ].filter(number => number !== this.wanted_tile.tile_number);

        // Create only one instance of the character to find
        let numbers = [this.wanted_tile.tile_number];

        for (let total = 0, max = this.total_heads - 1; total < max; total++) {
            numbers.push(characters[Utils.random(0, 2)]);
        }

        Utils.shuffleArray(numbers).forEach(number => {
            let head = new Head(this.current_room.getSize(), number);

            // Attach a click event only if this character is the one to find
            if (this.checkIsWanted(head)) {
                head.on('click', (e) => {
                    e.stopPropagation();
                    this.total_heads += 5;
                    this.trigger('win_round', {
                        points: ++this.points
                    });
                    this.changeCharacter();
                });
            }
        });
    }

    checkIsWanted(element) {
        return this.wanted_tile.tile_number === element.current_tile.tile_number;
    }
}