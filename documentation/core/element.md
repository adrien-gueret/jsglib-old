

[&lt; Back](./README.md)

# *class* Element
**use** [Events_Handler](./../traits/events_handler.md)

Main class handling the interactive game elements.

## Properties:

* **[Point](./../core/point.md)** *prev_position* Element position on previous frame.
* **[Point](./../core/point.md)** *position* Element current position.
* **[Point](./../core/point.md)** *transform_origin* Point used as origin for transformations, relative to element's position.
* **Number** *rotation* Rotation of the element, between 0 and 360 degrees.
* **[Layer](./../core/layer.md)** *layer* Layer where this element is displayed.
* **Class** *sprite_class* A class inherited from [Sprite](./sprite.md). This is the class used to display the element.
* **[Tile](./../core/tile.md)** *current_tile* The tile currently displayed.
* **[Animation](./../core/animation.md)** *current_animation* The currently used animation.
* **[Point](./../core/point.md)** *speed* The point representing this element speed.
* **[Point](./../core/point.md)** *acceleration* The point representing this element acceleration.
* **Boolean** *is_destroyed* Is this element destroyed or not?
* **Boolean** *is_inside_room* Is this element inside current room or not?
* **Boolean** *is_solid* Is this element solid or not?
* **Boolean** *stop_on_solids* Must this element stop on solids or not?

<a name="toc_constructor"></a><a name="toc_destroy"></a><a name="toc_getAnimationName"></a><a name="toc_getCurrentMasks"></a><a name="toc_getDirection"></a><a name="toc_getRectangle"></a><a name="toc_getSize"></a><a name="toc_onCollision"></a><a name="toc_setCurrentTileNumber"></a><a name="toc_setSpriteClass"></a><a name="toc_setTransformOriginToCenter"></a><a name="toc_useAnimation"></a><a name="toc_checkCollisions"></a><a name="toc_checkElementsCollisions"></a><a name="toc_checkTilesCollisions"></a><a name="toc_draw"></a><a name="toc_move"></a><a name="toc_refinePosition"></a><a name="toc_refinePositionOnSlopes"></a>

## Public methods:
* [constructor](#constructor)(x, y)
* [destroy](#destroy)()
* [getAnimationName](#getAnimationName)()
* [getCurrentMasks](#getCurrentMasks)()
* [getDirection](#getDirection)([to_degree=true])
* [getRectangle](#getRectangle)()
* [getSize](#getSize)()
* [onCollision](#onCollision)(targetClass, callback)
* [setCurrentTileNumber](#setCurrentTileNumber)(tile_number)
* [setSpriteClass](#setSpriteClass)(sprite_class, [current_tile_number=1])
* [setTransformOriginToCenter](#setTransformOriginToCenter)()
* [useAnimation](#useAnimation)(animation_name, [time=undefined], [loop=true], [timer=null])

## Private methods:
* [checkCollisions](#checkCollisions)(layers)
* [checkElementsCollisions](#checkElementsCollisions)(layer, mask, [position=this.position])
* [checkTilesCollisions](#checkTilesCollisions)(layer, mask, [position=this.position])
* [draw](#draw)(ctx)
* [move](#move)(delta_time)
* [refinePosition](#refinePosition)(layer, mask, checkCollisionsMethod)
* [refinePositionOnSlopes](#refinePositionOnSlopes)(slopes_tiles_data)

___

## <a name="constructor"></a>*public*  constructor(x, y) [:arrow_heading_up:](#toc_constructor)

### Params:

* **Number** *x* Start abscissa of the new element.
* **Number** *y* Start ordinate of the new element.

### Example:
```js
const myElement = new Element(10, 20);
```

## <a name="destroy"></a>*public*  destroy() [:arrow_heading_up:](#toc_destroy)

Destroy the element.

### Return:

**[Element](./../core/element.md)** This element.

### Example:
```js
myElement.destroy();
```

## <a name="setSpriteClass"></a>*public*  setSpriteClass(sprite_class, [current_tile_number=1]) [:arrow_heading_up:](#toc_setSpriteClass)

Define the Sprite class to use to display this element.

### Params:

* **Class** *sprite_class* A class inherited from [Sprite](./sprite.md).
* **Number** *[current_tile_number=1]* A class inherited from [Sprite](./sprite.md).

### Return:

**[Element](./../core/element.md)** This element.

### Examples:
* Example 1
```js
myElement.setSpriteClass(MyCustomSpriteClass);
```
* Example 2
```js
myElement.setSpriteClass(MyCustomSpriteClass, 3);
```

## <a name="setCurrentTileNumber"></a>*public*  setCurrentTileNumber(tile_number) [:arrow_heading_up:](#toc_setCurrentTileNumber)

Define the current tile number of the Sprite animation.

### Params:

* **Number** *tile_number* The new tile number.

### Return:

**[Element](./../core/element.md)** This element.

### Example:
```js
myElement.setCurrentTileNumber(3);
```

## <a name="useAnimation"></a>*public*  useAnimation(animation_name, [time=undefined], [loop=true], [timer=null]) [:arrow_heading_up:](#toc_useAnimation)

Define the new animation to use. Animations are defined via [Animation.defineTilesAnimations](./animation.md#toc_defineTilesAnimations).

### Params:

* **String** *animation_name* The name of the animation to use.
* **Number** *[time=undefined]* Time in ms between each tiles. Default set to the default time defined in this element Sprite class.
* **Boolean** *[loop=true]* If `true`, animation will be run again at end.
* **[Timer](./../core/timer.md)** *[timer=null]* Timer used for the animation.

### Return:

**[Element](./../core/element.md)** This element.

### Example:
```js
myElement.useAnimation('my_animation');
```

## <a name="getAnimationName"></a>*public*  getAnimationName() [:arrow_heading_up:](#toc_getAnimationName)

Get the name of the current played animation.

### Return:

**String** The current animation name.

### Example:
```js
const animationName = myElement.getAnimationName();
```

## <a name="getSize"></a>*public*  getSize() [:arrow_heading_up:](#toc_getSize)

Get the width and height of the element.

### Return:

**Object** An object with `height` and `width` properties.

### Example:
```js
const size = myElement.getSize();
```

## <a name="getDirection"></a>*public*  getDirection([to_degree=true]) [:arrow_heading_up:](#toc_getDirection)

Get the following direction of the element.

### Params:

* **Boolean** *[to_degree=true]* Indicates if we want a value in radians or in degrees.

### Return:

**Number** The direction in degrees if `to_degree` is `true`. In radians otherwise.

### Examples:
* Example 1
```js
const directionInDegrees = myElement.getDirection();
```
* Example 2
```js
const directionInRadians = myElement.getDirection(false);
```

## <a name="draw"></a>*private*  draw(ctx) [:arrow_heading_up:](#toc_draw)

Draw the element on given canvas context.

### Params:

* **Object** *ctx* The canvas context where the element has to be drawn.

### Return:

**[Element](./../core/element.md)** This element.

## <a name="getRectangle"></a>*public*  getRectangle() [:arrow_heading_up:](#toc_getRectangle)

Get a rectangle representation of the element.

### Return:

**[Rectangle](./../core/rectangle.md)** The rectangle object representing the element.

### Example:
```js
const rectangle = myElement.getRectangle();
```

## <a name="setTransformOriginToCenter"></a>*public*  setTransformOriginToCenter() [:arrow_heading_up:](#toc_setTransformOriginToCenter)

Move the transform origin point to the center of the element.

### Return:

**[Element](./../core/element.md)** This element.

### Example:
```js
myElement.setTransformOriginToCenter();
```

## <a name="move"></a>*private*  move(delta_time) [:arrow_heading_up:](#toc_move)

Move the element according to its speed and acceleration.

### Params:

* **Number** *delta_time* Time in ms between current frame and last one.

### Return:

**[Element](./../core/element.md)** This element.

## <a name="getCurrentMasks"></a>*public*  getCurrentMasks() [:arrow_heading_up:](#toc_getCurrentMasks)

Get all the collisions masks of the element.

### Return:

**Array** An array of [Mask](./Mask.md) objects.

### Example:
```js
const masks = myElement.getCurrentMasks();
```

## <a name="checkCollisions"></a>*private*  checkCollisions(layers) [:arrow_heading_up:](#toc_checkCollisions)

Check this element collisions with elements and tiles from provided layers and trigger corresponding events.

### Params:

* **Object** *layers* A JS object containing the layers to check. Format is `{ layerName: layerObject }`

## <a name="checkTilesCollisions"></a>*private*  checkTilesCollisions(layer, mask, [position=this.position]) [:arrow_heading_up:](#toc_checkTilesCollisions)

Check this element collisions with tiles from given layer.

### Params:

* **[Layer](./../core/layer.md)** *layer* The layer containing the tiles to check collisions with.
* **[Mask](./../core/mask.md)** *mask* Collisions mask to use to check collisions.
* **[Point](./../core/point.md)** *[position=this.position]* The position to move before checking collision.

### Return:

**Object** A JS object containing collisions data. Format is this one:
```js
{
  tiles: [], // Array of collided tiles
  solids_collisions: false, // true if there are at least one collision with solid tile
  slopes_collisions: false, // true if there are at least one collision with slope tile
  only_slopes_collisions: false, // true if there are collisions only with slopes tiles
}
```

## <a name="checkElementsCollisions"></a>*private*  checkElementsCollisions(layer, mask, [position=this.position]) [:arrow_heading_up:](#toc_checkElementsCollisions)

Check this element collisions with elements from given layer.

### Params:

* **[Layer](./../core/layer.md)** *layer* The layer containing the elements to check collisions with.
* **[Mask](./../core/mask.md)** *mask* Collisions mask to use to check collisions.
* **[Point](./../core/point.md)** *[position=this.position]* The position to move before checking collision.

### Return:

**Object** A JS object containing collisions data. Format is this one:
```js
{
  collisions: [], // Array of collided elements
  solids_collisions: false, // true if there are at least one collision with solid element
}
```

## <a name="refinePosition"></a>*private*  refinePosition(layer, mask, checkCollisionsMethod) [:arrow_heading_up:](#toc_refinePosition)

Move element in order to avoid collisions with solid elements and tiles.

### Params:

* **[Layer](./../core/layer.md)** *layer* The layer containing the elements and tiles to check collisions with.
* **[Mask](./../core/mask.md)** *mask* Collisions mask to use to check collisions.
* **Function** *checkCollisionsMethod* The function used to check collisions. Should be one of `this.checkElementsCollisions` or `this.checkTilesCollisions`.

### Return:

**[Element](./../core/element.md)** This element.

## <a name="refinePositionOnSlopes"></a>*private*  refinePositionOnSlopes(slopes_tiles_data) [:arrow_heading_up:](#toc_refinePositionOnSlopes)

Correctly move element on slopes if needed.

### Params:

* **Object** *slopes_tiles_data* Object containing slopes data.

### Return:

**Boolean** `true` if a movement has been performed. `false` otherwise.

## <a name="onCollision"></a>*public*  onCollision(targetClass, callback) [:arrow_heading_up:](#toc_onCollision)

Add an event listener to collision event with given class. If this element has collisions with an instance of given class, the given callback will be executed.

### Params:

* **Class** *targetClass* The class to check collisions with.
* **Function** *callback* The function to run when collision occurs.

### Return:

**[Element](./../core/element.md)** This element.

### Example:
```js
myElement.onCollision(MyTargetClass, (detailCollision, event) => {
     console.log(detailCollision, event);
});
```

[&lt; Back](./README.md)
