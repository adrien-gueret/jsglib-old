"use strict";

/**
 * @method random
 * @public
 * @description Get a random number.
 * @param {Number} min Minimum value of the number to generate.
 * @param {Number} max Maximum value of the number to generate.
 * @return {Number} The generated random number.
 * @example const randomNumber = Utils.random(0, 100);
 */
export function random(min, max) {
    if (min > max) {
        [min, max] = [max, min];
    }

    let delta = 1 + max - min;
    return Math.floor(delta * Math.random()) + min;
}

/**
 * @method shuffleArray
 * @public
 * @description Return a shuffled copy of given array.
 * @param {Array} array The array to shuffle.
 * @return {Array} A shuffled copy of the array.
 * @example const shuffledArray = Utils.shuffleArray([1, 2, 3, 4, 5]);
*/
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

/**
 * @method degreeToRadian
 * @public
 * @description Convert a degree value into radian.
 * @param {Number} degree The degree walue to convert.
 * @return {Number} The corresponding value in radian.
 * @example const radian = Utils.degreeToRadian(180);
 */
export function degreeToRadian(degree) {
    return (360 - degree) * Math.PI / 180;
}

/**
 * @method radianToDegree
 * @public
 * @description Convert a radian value into degree.
 * @param {Number} radian The radian walue to convert.
 * @return {Number} The corresponding value in degree.
 * @example const degree = Utils.radianToDegree(Math.PI);
 */
export function radianToDegree(radian) {
    let degree = -radian / (Math.PI / 180) + 360;

    while (degree < 0) {
        degree += 360;
    }

    return degree % 360;
}

/**
 * @namespace Utils
 * @description A collection of utils methods.
 * @example const { Utils } = JSGLib.Core;
 */
let Utils = {
    random,
    shuffleArray,
    degreeToRadian
};

export default Utils;