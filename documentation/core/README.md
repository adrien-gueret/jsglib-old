

[&lt; Back](../README.md)

# *namespace* Core

Core classes of JSGLib.

## Properties:

* **[Animation](./../core/animation.md)** *Animation* Class allowing sprites animations.
* **[Element](./../core/element.md)** *Element* Main class handling the interactive game elements.
* **[Game](./../core/game.md)** *Game* Main class handling a game.
* **[$http](./../core/$http.md)** *$http* Utils handling Ajax requests.
* **[Inputs](./../core/inputs.md)** *Inputs* Class handling users inputs, such as keyboard or mouse.
* **[Layer](./../core/layer.md)** *Layer* Class handling the different game layers.
* **[Mask](./../core/mask.md)** *Mask* Class used to define collisions masks on sprites tiles.
* **[Point](./../core/point.md)** *Point* A simple class handling points such as coordinates.
* **[Rectangle](./../core/rectangle.md)** *Rectangle* A simple class handling rectangles.
* **[Room](./../core/room.md)** *Room* Class handling the different game rooms.
* **[Sprite](./../core/sprite.md)** *Sprite* Class used to load and manipulate sprites.
* **[Tile](./../core/tile.md)** *Tile* Class used to decompose sprites into small squares called tiles.
* **[Timer](./../core/timer.md)** *Timer* Class handling time based events.
* **[Trait](./../core/trait.md)** *Trait* Class handling JSGLib traits.
* **[Utils](./../core/utils.md)** *Utils* A collection of utils methods.

### Examples:
* Example 1
```js
import { Core } from 'jsglib';
console.log(Core);
```
* Example 2
```js
const { Game, Room, Sprite, Tile } = JSGLib.Core;
```

___

[&lt; Back](../README.md)
