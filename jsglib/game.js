"use strict";

import Layer from 'jsglib/layer';
import Timer from 'jsglib/timer';
import EventsHandler from 'jsglib/events_handler';
import Inputs from 'jsglib/inputs';

export default class Game extends EventsHandler {
    constructor(game_container, layers = [
        Layer.MAIN_LAYER,
        Layer.TILES_LAYER,
        Layer.BACKGROUND_LAYER
    ], fps = 30) {
        super();
        this.container = game_container;
        this.current_room = null;
        this.classes = {};
        this.timer = new Timer(fps);

        this.defineLayers(layers);
        this.inputs = new Inputs(this.container);
    }

    defineLayers(layers) {
        this.layers = {};

        layers.reverse().forEach((layer, key) => {
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
            this.timer.trigger('frame');

            return this;
        }

        this.manageElements();

        this.render();

        this.last_loop_time = now - (delta % interval);

        return this;
    }

    manageElements() {
        for (let layer_name in this.layers) {
            let layer = this.layers[layer_name];

            layer.elements.forEach((element) => {
                element.trigger('frame');
                element.move();

                // Check collisions only if element has moved
                if (!element.position.equals(element.prev_position)) {
                    element.checkCollisions(this.layers);
                }

                if (!element.position.equals(element.prev_position)) {
                    layer.needs_clear = true;
                    element.prev_position.copy(element.position);
                }
            });
        }

        return this;
    }

    render() {
        for (let layer_name in this.layers) {
            let layer = this.layers[layer_name];
            let force_redraw = false;

            if (layer.needs_clear) {
                layer.clear();
                layer.needs_clear = false;
                force_redraw = true;
            }

            layer.draw(force_redraw);
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

        level.trigger('start');

        return this;
    }
}