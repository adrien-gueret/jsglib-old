"use strict";

import Layer from "./layer";
import Timer from "./timer";
import Inputs from "./inputs";
import Trait_EventsHandler from "../traits/events_handler";

class Game {
    constructor(game_container, layers = [
        Layer.MAIN_LAYER,
        Layer.TILES_LAYER,
        Layer.BACKGROUND_LAYER
    ], fps = 30) {
        this.container = game_container;
        this.current_room = null;
        this.classes = {};
        this.timer = new Timer(fps);
        this.is_paused = false;
        this.is_stopped = false;

        this.defineLayers(layers);
        this.inputs = new Inputs(this.container);

        this.inputs
            .on('click', () => {
                for (let layer_name in this.layers) {
                    let layer = this.layers[layer_name];

                    layer.elements.some((element) => {
                        if (this.inputs.mouse.isOverElement(element)) {
                            let custom_event = element.trigger('click', {mouse: this.inputs.mouse});
                            return custom_event.propagationStopped;
                        }
                    });
                }
            })
            .on('window_blur', this.togglePause.bind(this, true))
            .on('window_focus', this.togglePause.bind(this, false));

        this.on('pause_disabled', () => {
            this.last_loop_time = Date.now();
            this.$launchLoop();
        });
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
        this.trigger('start');
        this.last_loop_time = Date.now();
        this.$loop();
        return this;
    }

    stop() {
        let custom_event = this.trigger('stop');

        if (custom_event.defaultPrevented) {
            return this;
        }

        this.is_stopped = true;

        return this;
    }

    togglePause(force_pause) {
        this.is_paused = force_pause === undefined ? !this.is_paused : force_pause;

        this.trigger(this.is_paused ? 'pause_enabled' : 'pause_disabled');

        return this;
    }

    $launchLoop() {
        window.requestAnimationFrame(this.$loop.bind(this));
    }

    $loop() {
        if (this.is_paused) {
            return this;
        }

        if (this.is_stopped) {
            // Reset all properties!
            this.container = null;
            this.classes = null;
            this.layers = {};
            this.current_room.destroy();
            this.current_room = null;
            this.timer.destroy();
            this.timer = null;
            this.inputs.destroy();
            this.inputs = null;

            return this;
        }

        this.$launchLoop();

        let now = Date.now();
        let delta_time = now - this.last_loop_time;
        let interval = 1000 / this.timer.fps;

        if (delta_time <= interval) {
            return this;
        }

        this.timer.trigger('frame');

        this.$manageElements(delta_time / 1000);

        this.$render();

        this.last_loop_time = now - (delta_time % interval);

        return this;
    }

    $manageElements(delta_time) {
        for (let layer_name in this.layers) {
            let layer = this.layers[layer_name];

            layer.elements.forEach(element => {
                if (element.is_destroyed) {
                    return;
                }

                element.trigger('frame', {delta_time});
                element.move(delta_time);
                // We don't want elements to have float positions (prevent blurry effects and positions related bugs)
                element.position.round();

                // Check collisions only if element has moved
                if (!element.position.equals(element.prev_position)) {
                    element.checkCollisions(this.layers);
                }

                if (element.position.equals(element.prev_position)) {
                    return;
                }

                // Check if element is inside room
                if (this.current_room.getRectangle().isCollidedWithRectangle(element.getRectangle())) {
                    if (!element.is_inside_room) {
                        element.trigger('enter_room', {room: this.current_room});
                    }
                    element.is_inside_room = true;
                } else {
                    if (element.is_inside_room) {
                        element.trigger('leave_room', {room: this.current_room});
                    }
                    element.is_inside_room = false;
                }

                layer.needs_clear = true;
                element.prev_position.copy(element.position);
            });

            layer.elements.filter(element => element.is_destroyed).forEach(element => {
                layer.removeElement(element);
                element.current_tile = null;
                element.current_animation = null;
            });
        }

        return this;
    }

    $render() {
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

Trait_EventsHandler(Game);

export default Game;