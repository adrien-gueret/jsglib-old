"use strict";

import { Events_Handler } from "../traits";
import Point from "./point";
import Rectangle from "./rectangle";
import Mask from "./mask";
import {degreeToRadian, radianToDegree} from "./utils";

/**
 * @class Element
 * @use Traits.Events_Handler
 * @description Main class handling the interactive game elements.
 * @property {Core.Point} prev_position Element position on previous frame.
 * @property {Core.Point} position Element current position.
 * @property {Core.Point} transform_origin Point used as origin for transformations, relative to element's position.
 * @property {Number} rotation Rotation of the element, between 0 and 360 degrees.
 * @property {Core.Layer} layer Layer where this element is displayed.
 * @property {Class} sprite_class A class inherited from [Sprite](./sprite.md). This is the class used to display the element.
 * @property {Core.Tile} current_tile The tile currently displayed.
 * @property {Core.Animation} current_animation The currently used animation.
 * @property {Core.Point} speed The point representing this element speed.
 * @property {Core.Point} acceleration The point representing this element acceleration.
 * @property {Boolean} is_destroyed Is this element destroyed or not?
 * @property {Boolean} is_inside_room Is this element inside current room or not?
 * @property {Boolean} is_solid Is this element solid or not?
 * @property {Boolean} stop_on_solids Must this element stop on solids or not?
 */
class Element {
    /**
     * @method constructor
     * @public
     * @param {Number} x Start abscissa of the new element.
     * @param {Number} y Start ordinate of the new element.
     * @example const myElement = new Element(10, 20);
     */
    constructor(x, y) {
        this.prev_position = new Point(NaN, NaN);
        this.position = new Point(x, y);
        this.transform_origin = new Point();
        this.rotation = 0;
        this.layer = null;
        this.sprite_class = null;
        this.current_tile = null;
        this.current_animation = null;
        this.speed = new Point();
        this.acceleration = new Point();
        this.is_destroyed = false;
        this.is_inside_room = false;
        this.is_solid = false;
        this.stop_on_solids = false;
    }

    /**
     * @method destroy
     * @public
     * @description Destroy the element.
     * @return {Core.Element} This element.
     * @example myElement.destroy();
     */
    destroy() {
        let custom_event = this.trigger('destroy');

        if (custom_event.defaultPrevented) {
            return this;
        }

        if (this.current_animation) {
            this.current_animation.stop();
            this.current_animation = null;
        }

        this.is_destroyed = true;
        return this;
    }

    /**
     * @method setSpriteClass
     * @public
     * @description Define the Sprite class to use to display this element.
     * @param {Class} sprite_class A class inherited from [Sprite](./sprite.md).
     * @param {Number} [current_tile_number=1] A class inherited from [Sprite](./sprite.md).
     * @return {Core.Element} This element.
     * @example myElement.setSpriteClass(MyCustomSpriteClass);
     * @example myElement.setSpriteClass(MyCustomSpriteClass, 3);
     */
    setSpriteClass(sprite_class, current_tile_number = 1) {
        this.sprite_class = sprite_class;
        this.current_tile = sprite_class.getTile(current_tile_number);
        return this;
    }

    /**
     * @method setCurrentTileNumber
     * @public
     * @description Define the current tile number of the Sprite animation.
     * @param {Number} tile_number The new tile number.
     * @return {Core.Element} This element.
     * @example myElement.setCurrentTileNumber(3);
     */
    setCurrentTileNumber(tile_number) {
        this.current_tile = this.sprite_class.getTile(tile_number);

        if (this.layer) {
            this.layer.needs_clear = true;
        }

        return this;
    }


    /**
     * @method useAnimation
     * @public
     * @description Define the new animation to use. Animations are defined
     * via [Animation.defineTilesAnimations](./animation.md#toc_defineTilesAnimations).
     * @param {String} animation_name The name of the animation to use.
     * @param {Number} [time=undefined] Time in ms between each tiles.
     * Default set to the default time defined in this element Sprite class.
     * @param {Boolean} [loop=true] If `true`, animation will be run again at end.
     * @param {Core.Timer} [timer=null] Timer used for the animation.
     * @return {Core.Element} This element.
     * @example myElement.useAnimation('my_animation');
     */
    useAnimation(animation_name, time, loop = true, timer = null) {
        if (this.current_animation && this.current_animation.is_running) {
            if (this.getAnimationName() === animation_name) {
                return this;
            }

            this.current_animation.stop();
        }

        let animation_class = this.sprite_class.getAnimationClass(animation_name);

        if (!animation_class) {
            throw new ReferenceError('Element.useAnimation: animation "' + animation_name + '" is not defined for sprite "' + this.sprite_class.name + '".');
        }

        this.current_animation = new animation_class(timer);

        this.setCurrentTileNumber(this.current_animation.getCurrentTileNumber());

        this.current_animation
            .on('animation_update', () => {
                this.setCurrentTileNumber(this.current_animation.getCurrentTileNumber());
            })
            .start(time, loop);

        return this;
    }

    /**
     * @method getAnimationName
     * @public
     * @description Get the name of the current played animation.
     * @return {String} The current animation name.
     * @example const animationName = myElement.getAnimationName();
     */
    getAnimationName() {
        return this.current_animation ? this.current_animation.name : '';
    }

    /**
     * @method getSize
     * @public
     * @description Get the width and height of the element.
     * @return {Object} An object with `height` and `width` properties.
     * @example const size = myElement.getSize();
     */
    getSize() {
        let {width, height} = this.getRectangle();
        return {width, height};
    }

    /**
     * @method getDirection
     * @public
     * @description Get the following direction of the element.
     * @param {Boolean} [to_degree=true] Indicates if we want a value in radians or in degrees.
     * @return {Number} The direction in degrees if `to_degree` is `true`. In radians otherwise.
     * @example const directionInDegrees = myElement.getDirection();
     * @example const directionInRadians = myElement.getDirection(false);
     */
    getDirection(to_degree = true) {
        let direction = Math.atan2(-this.speed.y, this.speed.x);
        return to_degree ? radianToDegree(direction) : direction;
    }

    /**
     * @method draw
     * @private
     * @description Draw the element on given canvas context.
     * @param {Object} ctx The canvas context where the element has to be drawn.
     * @return {Core.Element} This element.
     */
    draw(ctx) {
        let transform_origin = this.position.add(this.transform_origin, true);
        let draw_position = this.position.subtract(transform_origin, true);

        ctx.save();
        ctx.translate(transform_origin.x, transform_origin.y);
        ctx.rotate(degreeToRadian(this.rotation));

        this.current_tile.draw(ctx, draw_position.x, draw_position.y);

        ctx.restore();

        return this;
    }

    /**
     * @method getRectangle
     * @public
     * @description Get a rectangle representation of the element.
     * @return {Core.Rectangle} The rectangle object representing the element.
     * @example const rectangle = myElement.getRectangle();
     */
    getRectangle() {
        let size = this.sprite_class ? this.sprite_class.getTilesSize() : {};
        return new Rectangle(size.width, size.height, this.position);
    }

    /**
     * @method setTransformOriginToCenter
     * @public
     * @description Move the transform origin point to the center of the element.
     * @return {Core.Element} This element.
     * @example myElement.setTransformOriginToCenter();
     */
    setTransformOriginToCenter() {
        let {width, height} = this.getSize();
        this.transform_origin.set(width / 2, height / 2);
        return this;
    }

    /**
     * @method move
     * @private
     * @description Move the element according to its speed and acceleration.
     * @param {Number} delta_time Time in ms between current frame and last one.
     * @return {Core.Element} This element.
     */
    move(delta_time) {
        let delta_position = new Point(delta_time, delta_time);
        this.speed.add(this.acceleration);
        this.position.add(this.speed.multiply(delta_position, true));
        return this;
    }

    /**
     * @method getCurrentMasks
     * @public
     * @description Get all the collisions masks of the element.
     * @return {Array} An array of [Mask](./Mask.md) objects.
     * @example const masks = myElement.getCurrentMasks();
     */
    getCurrentMasks() {
        return this.current_tile.hasMasks()
            ? this.current_tile.masks
            : [Mask.createFromRectangle(this.getRectangle(), this.is_solid, this.stop_on_solids)];
    }

    /**
     * @method checkCollisions
     * @private
     * @description Check this element collisions with elements and tiles from provided
     * layers and trigger corresponding events.
     * @param {Object} layers A JS object containing the layers to check. Format is `{ layerName: layerObject }`
     */
    checkCollisions(layers) {
        let has_solid_collision = false;
        let solid_tiles_collisions = [];
        let solid_elements_collisions = [];
        let solid_masks_collisions = [];

        this.getCurrentMasks().forEach(mask => {
            for (let layer_name in layers) {
                let layer = layers[layer_name];

                // First, check tiles collisions
                let collisions_data = this.checkTilesCollisions(layer, mask);

                // Check collisions with solid tiles
                if (mask.stop_on_solids && collisions_data.solids_collisions) {
                    has_solid_collision = true;

                    let new_solid_collisions = collisions_data.tiles.filter(tile_data => tile_data.tile.isSolid());
                    new_solid_collisions = new_solid_collisions.map(solid_tile_data => ({mask, solid_tile_data}));
                    solid_tiles_collisions = solid_tiles_collisions.concat(new_solid_collisions);

                    this.refinePosition(layer, mask, this.checkTilesCollisions);

                    if (collisions_data.slopes_collisions) {
                        this.refinePositionOnSlopes(new_solid_collisions.filter(collision_data => collision_data.solid_tile_data.tile.isSlope()));
                    }
                }

                // Trigger collision events for each tile
                collisions_data.tiles.some(tile_data => {
                    let custom_event = this.trigger('tile_collision', {tile_data, mask});
                    return custom_event.propagationStopped;
                });

                // Then check collisions with other elements
                collisions_data = this.checkElementsCollisions(layer, mask);

                // Check collisions with solid elements
                if (mask.stop_on_solids && collisions_data.solids_collisions) {
                    has_solid_collision = true;


                    collisions_data.collisions.forEach(collision => {
                        if (collision.element.is_solid) {
                            solid_elements_collisions.push({mask, solid_element: collision.element});
                        }

                        let new_solid_masks = collision.masks.filter(mask => mask.is_solid);
                        new_solid_masks = new_solid_masks.map(solid_mask => ({mask, solid_mask}));
                        solid_masks_collisions = solid_masks_collisions.concat(new_solid_masks);
                    });

                    this.refinePosition(layer, mask, this.checkElementsCollisions);
                }

                // Trigger collision events for each element
                collisions_data.collisions.some(collision => {
                    let custom_event = this.trigger('collision', {collision});
                    return custom_event.propagationStopped;
                });
            }
        });

        if (!has_solid_collision) {
            this.trigger('no_solids_collision');
        } else {
            let elements_collisions = solid_elements_collisions.map(collision => ({
                mask: collision.mask,
                solid: collision.solid_element,
                position: collision.solid_element.position
            }));

            let masks_collisions = solid_masks_collisions.map(collision => ({
                mask: collision.mask,
                solid: collision.solid_mask,
                position: collision.solid_mask.position
            }));

            let tiles_collisions = solid_tiles_collisions.map(collision => ({
                mask: collision.mask,
                solid: collision.solid_tile_data.tile,
                position: collision.solid_tile_data.position
            }));

            let all_solids_collisions = tiles_collisions
                .concat(elements_collisions)
                .concat(masks_collisions);

            this.trigger('solids_collision', {
                elements_collisions,
                masks_collisions,
                tiles_collisions,
                all_solids_collisions
            });
        }
    }

    /**
     * @method checkTilesCollisions
     * @private
     * @description Check this element collisions with tiles from given layer.
     * @param {Core.Layer} layer The layer containing the tiles to check collisions with.
     * @param {Core.Mask} mask Collisions mask to use to check collisions.
     * @param {Core.Point} [position=this.position] The position to move before checking collision.
     * @return {Object}
     * A JS object containing collisions data. Format is this one:
     * ```js
     * {
     *   tiles: [], // Array of collided tiles
     *   solids_collisions: false, // true if there are at least one collision with solid tile
     *   slopes_collisions: false, // true if there are at least one collision with slope tile
     *   only_slopes_collisions: false, // true if there are collisions only with slopes tiles
     * }
     * ```
     */
    checkTilesCollisions(layer, mask, position = this.position) {
        let data = {
            tiles: [],
            solids_collisions: false,
            slopes_collisions: false,
            only_slopes_collisions: false
        };

        if (!layer.tiles.length) {
            return data;
        }

        let rectangle = mask.clone();
        rectangle.position.add(position);

        data.tiles = layer.getTilesFromRectangle(rectangle);

        let end_slope_tile = data.tiles.filter(tile_data => tile_data.tile.isEndSlope())[0];

        // If collision with "end of slope" tile, ignore solid directly next to this tile
        if (end_slope_tile) {
            let contact_y = end_slope_tile.tile.getContactY(rectangle.getCenter().x, end_slope_tile.position);

            // Ignore only if element can interact with this slope
            if (!isNaN(contact_y)) {
                let delta = end_slope_tile.tile.getSize().width;

                if (end_slope_tile.tile.slope_point.x === 0) {
                    delta *= -1;
                }

                data.tiles = data.tiles.filter(tile_data => {
                    return !(tile_data.tile.isSolid() &&
                    tile_data.position.y === end_slope_tile.position.y &&
                    tile_data.position.x === end_slope_tile.position.x + delta);
                });
            }
        }

        let solids_tiles = data.tiles.filter(tile_data => tile_data.tile.isSolid());
        data.solids_collisions = solids_tiles.length > 0;
        data.slopes_collisions = data.solids_collisions && solids_tiles.some(tile_data => tile_data.tile.isSlope());
        data.only_slopes_collisions = data.slopes_collisions && solids_tiles.every(tile_data => tile_data.tile.isSlope());

        return data;
    }

    /**
     * @method checkElementsCollisions
     * @private
     * @description Check this element collisions with elements from given layer.
     * @param {Core.Layer} layer The layer containing the elements to check collisions with.
     * @param {Core.Mask} mask Collisions mask to use to check collisions.
     * @param {Core.Point} [position=this.position] The position to move before checking collision.
     * @return {Object}
     * A JS object containing collisions data. Format is this one:
     * ```js
     * {
     *   collisions: [], // Array of collided elements
     *   solids_collisions: false, // true if there are at least one collision with solid element
     * }
     * ```
     */
    checkElementsCollisions(layer, mask, position = this.position) {
        let data = {
            collisions: [],
            solids_collisions: false
        };

        if (!layer.elements.length) {
            return data;
        }

        let rectangle = mask.clone();
        rectangle.position.add(position);

        layer.elements.forEach(element => {
            if (element === this) {
                return;
            }

            let collision = {
                element: null,
                masks: []
            };

            element.getCurrentMasks().forEach(otherMask => {
                let otherRectangle = otherMask.clone();
                otherRectangle.position.add(element.position);

                if (rectangle.isCollidedWithRectangle(otherRectangle)) {
                    collision.element = element;
                    collision.masks.push(otherRectangle);
                }
            });

            if (collision.element) {
                data.collisions.push(collision);
            }
        });

        data.solids_collisions = data.collisions.some(collision => collision.element.is_solid || collision.masks.some(mask => mask.is_solid));

        return data;
    }

    /**
     * @method refinePosition
     * @private
     * @description Move element in order to avoid collisions with solid elements and tiles.
     * @param {Core.Layer} layer The layer containing the elements and tiles to check collisions with.
     * @param {Core.Mask} mask Collisions mask to use to check collisions.
     * @param {Function} checkCollisionsMethod The function used to check collisions. Should be one
     * of `this.checkElementsCollisions` or `this.checkTilesCollisions`.
     * @return {Core.Element} This element.
     */
    refinePosition(layer, mask, checkCollisionsMethod) {
        let delta_position = this.position.subtract(this.prev_position, true);
        let limit_x = Math.abs(delta_position.x);
        let limit_y = Math.abs(delta_position.y);
        let delta_x = Math.sign(delta_position.x);
        let delta_y = Math.sign(delta_position.y);
        let new_position = this.prev_position.clone();

        // Refine X
        for (let x = 0; x < limit_x; x++) {
            new_position.x += delta_x;

            let collisions_data = checkCollisionsMethod.call(this, layer, mask, new_position);
            if (collisions_data.solids_collisions && !collisions_data.only_slopes_collisions) {
                new_position.x -= delta_x;
                break;
            }
        }

        // Refine Y
        for (let y = 0; y < limit_y; y++) {
            new_position.y += delta_y;

            let collisions_data = checkCollisionsMethod.call(this, layer, mask, new_position);
            if (collisions_data.solids_collisions && !collisions_data.only_slopes_collisions) {
                new_position.y -= delta_y;
                break;
            }
        }

        this.position.copy(new_position);

        return this;
    }

    /**
     * @method refinePositionOnSlopes
     * @private
     * @description Correctly move element on slopes if needed.
     * @param {Object} slopes_tiles_data Object containing slopes data.
     * @return {Boolean} `true` if a movement has been performed. `false` otherwise.
     */
    refinePositionOnSlopes(slopes_tiles_data) {
        let new_position = this.position.clone();
        let height = this.getSize().height;
        let center_x = this.getRectangle().getCenter().x;

        return slopes_tiles_data.some(slope_data => {
            let y_contact = slope_data.solid_tile_data.tile.getContactY(center_x, slope_data.solid_tile_data.position);

            if (isNaN(y_contact)) {
                return false;
            }

            new_position.y = y_contact - height - 1;

            if (new_position.y - this.position.y >= 0) {
                return true;
            }

            this.position.copy(new_position).round();

            return true;
        });
    }

    /**
     * @method onCollision
     * @public
     * @description Add an event listener to collision event with given class. If this element has collisions with
     * an instance of given class, the given callback will be executed.
     * @param {Class} targetClass The class to check collisions with.
     * @param {Function} callback The function to run when collision occurs.
     * @return {Core.Element} This element.
     * @example
     * myElement.onCollision(MyTargetClass, (detailCollision, event) => {
     *      console.log(detailCollision, event);
     * });
     */
    onCollision(targetClass, callback) {
        this.on('collision', e => {
            let element = e.detail.collision.element;

            if (element instanceof targetClass) {
                callback(e.detail.collision, e);
            }
        });

        return this;
    }
}

Events_Handler(Element);

export default Element;