"use strict";

import Layer from 'jsglib/layer';
import Timer from 'jsglib/timer';

export default class Game {
    constructor(game_container, layers = [
        Layer.MAIN_LAYER,
        Layer.TILES_LAYER,
        Layer.BACKGROUND_LAYER
    ], fps = 30) {
        this.container = game_container;
        this.current_room = null;
        this.classes = {};
        this.timer = new Timer(fps);

        this.defineLayers(layers);
    }

    defineLayers(layers) {
        this.layers = {};

        layers.forEach((layer, key) => {
            layer.setZindex(key);
            this.layers[layer.name] = layer;
            this.container.appendChild(layer.canvas);
        });

        return this;
    }

    getLayerFromName(layer_name) {
        return this.layers[layer_name];
    }

    registerClass(new_class) {
        this.classes[new_class.name] = new_class;
        return this;
    }

    getClass(class_name) {
        if (typeof class_name === 'function') {
            return class_name;
        }

        if (this.classes[class_name]) {
            return this.classes[class_name];
        }

        return window[class_name];
    }

    start() {
        this.last_loop_time = Date.now();
        this.loop();
        return this;
    }

    loop() {
        window.requestAnimationFrame(this.loop.bind(this));

        let now = Date.now();
        let delta = now - this.last_loop_time;
        let interval = 1000 / this.timer.fps;

        if (delta <= interval) {
            this.timer.trigger('step');

            return this;
        }

        this.render();

        this.last_loop_time = now - (delta % interval);

        return this;
    }

    render() {
        if (!this.layers) {
            return this;
        }

        for (let layer_name in this.layers) {
            this.layers[layer_name].draw(this.timer);
        }

        return this;
    }

    goToRoom(level) {
        this.current_room = level;
        level.initRoom(this);

        this.container.style.width = level.width + 'px';
        this.container.style.height = level.height + 'px';

        for (let layer_name in this.layers) {
            let layer = this.layers[layer_name];
            layer.setSize(level.width, level.height);
        }

        return this;
    }
}