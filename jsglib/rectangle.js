"use strict";

import Point from 'jsglib/point';

export default class Rectangle {
    constructor(width = 0, height = 0, position) {
        this.width = width;
        this.height = height;
        this.position = position.clone() || new Point();
    }

    getCenter() {
        return new Point(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2
        );
    }
}