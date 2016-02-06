"use strict";

import EventsHandler from 'jsglib/events_handler';
import Point from 'jsglib/point';

class Inputs extends EventsHandler {
    constructor(dom_element) {
        super();

        this.mouse = new Point();
        this.keys_pressed = [];

        dom_element.addEventListener('mousemove', (e) => {
            let x = e.pageX;
            let y = e.pageY;

            x -= (dom_element.getBoundingClientRect().left + (window.pageXOffset || dom_element.scrollLeft) + (dom_element.clientLeft || 0));
            y -= (dom_element.getBoundingClientRect().top + (window.pageYOffset || dom_element.scrollTop) + (dom_element.clientTop || 0));

            this.mouse.x = Math.floor(x);
            this.mouse.y = Math.floor(y);

            this.trigger('mousemove', {
                mouse: this.mouse
            })
        });

        dom_element.addEventListener('click', () => {
            this.trigger('click', {
                mouse: this.mouse
            });
        });

        document.body.addEventListener('keydown', (e) => {
            let key = e.which || e.keyCode;

            if (this.isKeyPressed(key)) {
                return;
            }

            // We don't handle more than 2 pressed keys on same time
            if (this.keys_pressed.length >= 2) {
                return;
            }

            this.keys_pressed.push(key);

            let custom_event = this.trigger('keydown', {
                key: key,
                is_arrow: key >= Inputs.KEYS.ARROWS.LEFT && key <= Inputs.KEYS.ARROWS.DOWN
            });

            if (custom_event.defaultPrevented) {
                e.preventDefault();
            }
        });

        document.body.addEventListener('keyup', (e) => {
            let key = e.which || e.keyCode;
            this.keys_pressed.some((current_key, key_index) => {
                if (key === current_key) {
                    this.keys_pressed.splice(key_index, 1);
                    return true;
                }
            });

            let custom_event = this.trigger('keyup', {
                key: key,
                is_arrow: key >= Inputs.KEYS.ARROWS.LEFT && key <= Inputs.KEYS.ARROWS.DOWN
            });

            if (custom_event.defaultPrevented) {
                e.preventDefault();
            }
        });
    }

    isKeyPressed(key) {
        return this.keys_pressed.indexOf(key) >= 0;
    }

    getPressedArrows() {
        let arrows_keys = [];

        for (let key_name in Inputs.KEYS.ARROWS) {
            let key = Inputs.KEYS.ARROWS[key_name];
            if (this.isKeyPressed(key)) {
                arrows_keys.push(key);
            }
        }

        return arrows_keys;
    }
}

Inputs.KEYS = {
    ARROWS: {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    },
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    CONTROL: 17,
    ALT: 18,
    CAPS_LOCK: 20,
    SPACE: 32,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90
};

export default Inputs;