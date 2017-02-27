

[&lt; Back](./README.md)

# *class* Animation
**use** [Events_Handler](./../traits/events_handler.md)

Animation Class allowing sprites animations. You should not use it by yourself: this class is
used behind the scenes to handle sprites animations.

## Properties:

* **[Timer](./../core/timer.md)** *timer* Timer used for the animation.
* **Array** *tiles_numbers* Tiles numbers used in the animation.
* **Number** *default_time* Default time in ms between each tiles.
* **Number** *animation_index* Current tile index.
* **String** *animation_clock* Clock name of current running animation.
* **Boolean** *is_running* `true` if the animation is running, `false` otherwise.

<a name="toc_constructor"></a><a name="toc_define"></a><a name="toc_getCurrentTileNumber"></a><a name="toc_getPreviousTileNumber"></a><a name="toc_start"></a><a name="toc_stop"></a>

## Private methods:
* [constructor](#constructor)(timer, [tiles_numbers=[]], [default_time=500])
* *static* [define](#define)(timer, tiles_numbers, default_time, name)
* [getCurrentTileNumber](#getCurrentTileNumber)()
* [getPreviousTileNumber](#getPreviousTileNumber)()
* [start](#start)([time=this.default_time], [loop=true])
* [stop](#stop)()

___

## <a name="constructor"></a>*private*  constructor(timer, [tiles_numbers=[]], [default_time=500]) [:arrow_heading_up:](#toc_constructor)

### Params:

* **[Timer](./../core/timer.md)** *timer* Timer used for the animation.
* **Array** *[tiles_numbers=[]]* Tiles numbers used in the animation.
* **Number** *[default_time=500]* Default time in ms between each tiles.

## <a name="getPreviousTileNumber"></a>*private*  getPreviousTileNumber() [:arrow_heading_up:](#toc_getPreviousTileNumber)

Get the previous tile number of current animation.

### Return:

**Number** The previous tile number of current animation.

## <a name="getCurrentTileNumber"></a>*private*  getCurrentTileNumber() [:arrow_heading_up:](#toc_getCurrentTileNumber)

Get the current tile number of current animation.

### Return:

**Number** The current tile number of current animation.

## <a name="start"></a>*private*  start([time=this.default_time], [loop=true]) [:arrow_heading_up:](#toc_start)

Start the animation.

### Params:

* **Number** *[time=this.default_time]* Time in ms between each tiles.
* **Boolean** *[loop=true]* If `true`, animation will be repeated.

### Return:

**[Animation](./../core/animation.md)** This animation.

## <a name="stop"></a>*private*  stop() [:arrow_heading_up:](#toc_stop)

Stop the animation.

### Return:

**[Animation](./../core/animation.md)** This animation.

## <a name="define"></a>*private* *static*  define(timer, tiles_numbers, default_time, name) [:arrow_heading_up:](#toc_define)

Define a new Animation class. This method is called behind the scene by the
static method `defineTilesAnimations()` of `Sprite` class.

### Params:

* **[Timer](./../core/timer.md)** *timer* Timer used for the animation.
* **Array** *tiles_numbers* Tiles numbers used in the animation.
* **Number** *default_time* Default time in ms between each tiles.
* **Symbol|String** *name* Name of the new Animation class.

### Return:

**Class** The new Animation class.

[&lt; Back](./README.md)
