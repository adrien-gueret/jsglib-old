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

export function degreeToRadian(degree) {
    return (360 - degree) * Math.PI / 180;
}

export function radianToDegree(radian) {
    let degree = -radian / (Math.PI / 180) + 360;

    while (degree < 0) {
        degree += 360;
    }

    return degree % 360;
}

let Utils = {
    random,
    shuffleArray,
    degreeToRadian
};

export default Utils;