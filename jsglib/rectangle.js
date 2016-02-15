"use strict";

import Point from "jsglib/point";

export default class Rectangle {
    constructor(width = 0, height = 0, position) {
        this.width = width;
        this.height = height;
        this.position = position ? position.clone() : new Point();
    }

    getCenter() {
        return new Point(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2
        );
    }

    isCollidedWithRectangle(rectangle) {
        return !((rectangle.position.x >= this.position.x + this.width) ||  // too right
        (rectangle.position.x + rectangle.width <= this.position.x) ||      // too left
        (rectangle.position.y >= this.position.y + this.height) ||          // too down
        (rectangle.position.y + rectangle.height <= this.position.y));      // too up
    }

    containsRectangle(rectangle) {
        return rectangle.position.x > this.position.x &&
            rectangle.position.y > this.position.y &&
            rectangle.position.x + rectangle.width < this.position.x + this.width &&
            rectangle.position.y + rectangle.height < this.position.y + this.height;
    }
}