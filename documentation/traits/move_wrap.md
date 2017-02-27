

[&lt; Back](./README.md)

# *trait* Move_Wrap

Trait allowing affected elements to switch to opposite side of a room when the go outside it.

<a name="toc_initMoveWrap"></a>

## Public method:
* [initMoveWrap](#initMoveWrap)([wrap_horizontally=true], [wrap_vertically=true])

___

## <a name="initMoveWrap"></a>*public*  initMoveWrap([wrap_horizontally=true], [wrap_vertically=true]) [:arrow_heading_up:](#toc_initMoveWrap)

Init the "move wrap" feature.

### Params:

* **Boolean** *[wrap_horizontally=true]* If `true`, the element will be switch to opposite side if it goes outside the room from the left or from the right.
* **Boolean** *[wrap_vertically=true]* If `true`, the element will be switch to opposite side if it goes outside the room from the top or from the bottom.

### Return:

**[Element](./../core/element.md)** This instance.

### Examples:
* Example 1
```js
myInstance.initMoveWrap();
```
* Example 2
```js
myInstance.initMoveWrap(false);
```
* Example 3
```js
myInstance.initMoveWrap(true, false);
```

[&lt; Back](./README.md)
