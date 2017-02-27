

[&lt; Back](./README.md)

# *namespace* $http

Utils handling Ajax requests.

## Properties:

* **Object** *DATA_TYPES* A collection of data types constants. It has the properties `TEXT`, `XML` and `JSON`.

### Example:
```js
const { $http } = JSGLib.Core;
```

<a name="toc_delete"></a><a name="toc_get"></a><a name="toc_post"></a><a name="toc_put"></a>

## Public methods:
* [delete](#delete)(url, [options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}])
* [get](#get)(url, [options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}])
* [post](#post)(url, [options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}])
* [put](#put)(url, [options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}])

___

## <a name="get"></a>*public*  get(url, [options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}]) [:arrow_heading_up:](#toc_get)

Perform a GET request.

### Params:

* **String** *url* Url to request.
* **Object** *[options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}]* The options to send to the request. Properties are:
 _Object_ data Data to send with the request, in the format { paramName: paramValue }
 _Boolean_ async Tells if the Ajax request should be performed asynchronously or not.
 _String_ data_type Type of data the request is expected to answer with.

### Return:

**Promise** The promise handling the request.

### Examples:
* Example 1
```js
$http.get('http://my.url.com/').then((response) => {
 //  ...
});
```
* Example 2
```js
$http.get('http://my.url.com/', { data_type: $http.DATA_TYPES.JSON }).then((response) => {
 //  ...
});
```

## <a name="post"></a>*public*  post(url, [options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}]) [:arrow_heading_up:](#toc_post)

Perform a POST request.

### Params:

* **String** *url* Url to request.
* **Object** *[options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}]* The options to send to the request. Properties are:
 _Object_ data Data to send with the request, in the format { paramName: paramValue }
 _Boolean_ async Tells if the Ajax request should be performed asynchronously or not.
 _String_ data_type Type of data the request is expected to answer with.

### Return:

**Promise** The promise handling the request.

### Examples:
* Example 1
```js
$http.post('http://my.url.com/').then((response) => {
 //  ...
});
```
* Example 2
```js
$http.post('http://my.url.com/', { data: { foo: 'bar' } }).then((response) => {
 //  ...
});
```

## <a name="delete"></a>*public*  delete(url, [options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}]) [:arrow_heading_up:](#toc_delete)

Perform a DELETE request.

### Params:

* **String** *url* Url to request.
* **Object** *[options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}]* The options to send to the request. Properties are:
 _Object_ data Data to send with the request, in the format { paramName: paramValue }
 _Boolean_ async Tells if the Ajax request should be performed asynchronously or not.
 _String_ data_type Type of data the request is expected to answer with.

### Return:

**Promise** The promise handling the request.

### Examples:
* Example 1
```js
$http.delete('http://my.url.com/').then((response) => {
 //  ...
});
```
* Example 2
```js
$http.delete('http://my.url.com/', { data: { foo: 'bar' } }).then((response) => {
 //  ...
});
```

## <a name="put"></a>*public*  put(url, [options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}]) [:arrow_heading_up:](#toc_put)

Perform a PUT request.

### Params:

* **String** *url* Url to request.
* **Object** *[options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}]* The options to send to the request. Properties are:
 _Object_ data Data to send with the request, in the format { paramName: paramValue }
 _Boolean_ async Tells if the Ajax request should be performed asynchronously or not.
 _String_ data_type Type of data the request is expected to answer with.

### Return:

**Promise** The promise handling the request.

### Examples:
* Example 1
```js
$http.put('http://my.url.com/').then((response) => {
 //  ...
});
```
* Example 2
```js
$http.put('http://my.url.com/', { data: { foo: 'bar' } }).then((response) => {
 //  ...
});
```

[&lt; Back](./README.md)
