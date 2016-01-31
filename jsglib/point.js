"use strict";

export default class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    equals(point) {
        return this.x === point.x && this.y === point.y;
    }
}