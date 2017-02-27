

[&lt; Back](./README.md)

# *namespace* Utils

A collection of utils methods.

### Example:
```js
const { Utils } = JSGLib.Core;
```

<a name="toc_degreeToRadian"></a><a name="toc_radianToDegree"></a><a name="toc_random"></a><a name="toc_shuffleArray"></a>

## Public methods:
* [degreeToRadian](#degreeToRadian)(degree)
* [radianToDegree](#radianToDegree)(radian)
* [random](#random)(min, max)
* [shuffleArray](#shuffleArray)(array)

___

## <a name="random"></a>*public*  random(min, max) [:arrow_heading_up:](#toc_random)

Get a random number.

### Params:

* **Number** *min* Minimum value of the number to generate.
* **Number** *max* Maximum value of the number to generate.

### Return:

**Number** The generated random number.

### Example:
```js
const randomNumber = Utils.random(0, 100);
```

## <a name="shuffleArray"></a>*public*  shuffleArray(array) [:arrow_heading_up:](#toc_shuffleArray)

Return a shuffled copy of given array.

### Params:

* **Array** *array* The array to shuffle.

### Return:

**Array** A shuffled copy of the array.

### Example:
```js
const shuffledArray = Utils.shuffleArray([1, 2, 3, 4, 5]);
```

## <a name="degreeToRadian"></a>*public*  degreeToRadian(degree) [:arrow_heading_up:](#toc_degreeToRadian)

Convert a degree value into radian.

### Params:

* **Number** *degree* The degree walue to convert.

### Return:

**Number** The corresponding value in radian.

### Example:
```js
const radian = Utils.degreeToRadian(180);
```

## <a name="radianToDegree"></a>*public*  radianToDegree(radian) [:arrow_heading_up:](#toc_radianToDegree)

Convert a radian value into degree.

### Params:

* **Number** *radian* The radian walue to convert.

### Return:

**Number** The corresponding value in degree.

### Example:
```js
const degree = Utils.radianToDegree(Math.PI);
```

[&lt; Back](./README.md)
