"use strict";

export default class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.x_min = NaN;
        this.y_min = NaN;
        this.x_max = NaN;
        this.y_max = NaN;
    }

    set(x, y = x) {
        this.x = x;
        this.y = y;

        if (!isNaN(this.x_min)) {
            this.x = Math.max(this.x, this.x_min);
        }

        if (!isNaN(this.x_max)) {
            this.x = Math.min(this.x, this.x_min);
        }

        if (!isNaN(this.y_min)) {
            this.y = Math.max(this.y, this.y_min);
        }

        if (!isNaN(this.y_max)) {
            this.y = Math.min(this.y, this.y_min);
        }

        return this;
    }

    $set(x, y, new_point) {
        if (new_point) {
            return this.clone().set(x, y);
        }

        return this.set(x, y);
    }

    copy(point) {
        return this.set(point.x, point.y);
    }

    clone() {
        return new Point(this.x, this.y).minimum(this.x_min, this.y_min, false).maximum(this.x_max, this.y_max, false);
    }

    equals(point) {
        return this.x === point.x && this.y === point.y;
    }

    add(point, new_point = false) {
        let new_x = this.x + point.x;
        let new_y = this.y + point.y;

        return this.$set(new_x, new_y, new_point);
    }

    subtract(point, new_point = false) {
        let new_x = this.x - point.x;
        let new_y = this.y - point.y;

        return this.$set(new_x, new_y, new_point);
    }

    multiply(point, new_point = false) {
        let new_x = this.x * point.x;
        let new_y = this.y * point.y;

        return this.$set(new_x, new_y, new_point);
    }

    divide(point, new_point = false) {
        let new_x = this.x / point.x;
        let new_y = this.y / point.y;

        return this.$set(new_x, new_y, new_point);
    }

    abs(new_point = false) {
        let new_x = Math.abs(this.x);
        let new_y = Math.abs(this.y);

        return this.$set(new_x, new_y, new_point);
    }

    round(new_point = false) {
        let new_x = this.x + (this.x < 0 ? -.5 : .5);
        let new_y = this.y + (this.y < 0 ? -.5 : .5);

        return this.$set(new_x | 0, new_y | 0, new_point);
    }

    minimum(x, y = x, new_point = false) {
        let point = new_point ? this.clone() : this;

        point.x_min = x;
        point.y_min = y;

        return this.set(this.x, this.y);
    }

    maximum(x, y = x, new_point = false) {
        let point = new_point ? this.clone() : this;

        point.x_max = x;
        point.y_max = y;

        return this.set(this.x, this.y);
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

    getDistanceFromPoint(point) {
        let delta = this.subtract(point, true).abs();

        delta.multiply(delta);

        return Math.sqrt(delta.x + delta.y);
    }
}