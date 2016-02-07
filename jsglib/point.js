"use strict";

export default class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    copy(point) {
        this.constructor(point.x, point.y);
        return this;
    }

    clone() {
        return new Point(this.x, this.y);
    }

    equals(point) {
        return this.x === point.x && this.y === point.y;
    }

    add(point, new_point = true) {
        if (new_point) {
            return new Point(this.x + point.x, this.y + point.y);
        }

        this.x += point.x;
        this.y += point.y;

        return this;
    }

    substract(point, new_point = true) {
        if (new_point) {
            return new Point(this.x - point.x, this.y - point.y);
        }

        this.x -= point.x;
        this.y -= point.y;

        return this;
    }

    isInRectangle(rectangle) {
        return (this.x >= rectangle.position.x &&
        this.x < rectangle.position.x + rectangle.width &&
        this.y >= rectangle.position.y &&
        this.y < rectangle.position.y + rectangle.height);
    }

    isOverElement(element) {
        return this.isInRectangle(element.getRectangle());
    }
}