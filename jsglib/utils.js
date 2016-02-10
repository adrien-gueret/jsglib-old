"use strict";

export function random(min, max) {
    if (min > max) {
        [min, max] = [max, min];
    }

    let delta = 1 + max - min;
    return Math.floor(delta * Math.random()) + min;
}

export function shuffleArray(array) {
    let shuffled_array = [];
    let length = array.length;

    while (length) {

        let randomIndex = Math.floor(Math.random() * array.length);
        let value = array.splice(randomIndex, 1);
        length--;

        shuffled_array.push(value[0]);
    }

    return shuffled_array;
}

let Utils = {
    random,
    shuffleArray
};

export default Utils;