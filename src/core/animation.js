import { Events_Handler } from "../traits";

/**
 * @class Animation
 * @use Traits.Events_Handler
 * @description
 * Animation Class allowing sprites animations. You should not use it by yourself: this class is
 * used behind the scenes to handle sprites animations.
 * @property {Core.Timer} timer Timer used for the animation.
 * @property {Array} tiles_numbers Tiles numbers used in the animation.
 * @property {Number} default_time Default time in ms between each tiles.
 * @property {Number} animation_index Current tile index.
 * @property {String} animation_clock Clock name of current running animation.
 * @property {Boolean} is_running `true` if the animation is running, `false` otherwise.
 */
class Animation {
    /**
     * @method constructor
     * @private
     * @param {Core.Timer} timer Timer used for the animation.
     * @param {Array} [tiles_numbers=[]] Tiles numbers used in the animation.
     * @param {Number} [default_time=500] Default time in ms between each tiles.
     */
    constructor(timer, tiles_numbers = [], default_time = 500) {
        this.timer = timer;
        this.tiles_numbers = tiles_numbers;
        this.default_time = default_time;
        this.animation_index = 0;
        this.animation_clock = null;
        this.is_running = false;
    }

    /**
     * @method getPreviousTileNumber
     * @private
     * @description Get the previous tile number of current animation.
     * @return {Number} The previous tile number of current animation.
     */
    getPreviousTileNumber() {
        let tile_index = this.animation_index > 0 ? this.animation_index - 1 : this.tiles_numbers.length - 1;

        return this.tiles_numbers[tile_index];
    }

    /**
     * @method getCurrentTileNumber
     * @private
     * @description Get the current tile number of current animation.
     * @return {Number} The current tile number of current animation.
     */
    getCurrentTileNumber() {
        return this.tiles_numbers[this.animation_index];
    }

    /**
     * @method start
     * @private
     * @description Start the animation.
     * @param {Number} [time=this.default_time] Time in ms between each tiles.
     * @param {Boolean} [loop=true] If `true`, animation will be repeated.
     * @return {Core.Animation} This animation.
     */
    start(time = this.default_time, loop = true) {
        this.is_running = true;

        this.animation_clock = this.timer.setTimeout(() => {
            this.animation_index++;

            if (this.animation_index < this.tiles_numbers.length) {
                this.trigger('animation_update');
                this.start(time, loop);
            } else if (loop) {
                this.stop();
                this.trigger('animation_update');
                this.start(time, loop);
            } else {
                this.stop();
                this.trigger('animation_end');
            }
        }, time);
        return this;
    }

    /**
     * @method stop
     * @private
     * @description Stop the animation.
     * @return {Core.Animation} This animation.
     */
    stop() {
        if (this.animation_clock) {
            this.timer.clearTimeout(this.animation_clock);
        }

        this.animation_clock = null;
        this.animation_index = 0;
        this.is_running = false;
        return this;
    }

    /**
     * @method define
     * @static
     * @private
     * @description
     * Define a new Animation class. This method is called behind the scene by the
     * static method `defineTilesAnimations()` of `Sprite` class.
     * @param {Core.Timer} timer Timer used for the animation.
     * @param {Array} tiles_numbers Tiles numbers used in the animation.
     * @param {Number} default_time Default time in ms between each tiles.
     * @param {Symbol|String} name Name of the new Animation class.
     * @return {Class} The new Animation class.
     */
    static define(timer, tiles_numbers, default_time, name = Symbol()) {
        Animation.classes[name] = class extends Animation {
            constructor(default_timer) {
                super(timer || default_timer, tiles_numbers, default_time);
                this.name = name;
            }
        };

        return Animation.classes[name];
    }
}

Animation.classes = {};

Events_Handler(Animation);

export default Animation;
