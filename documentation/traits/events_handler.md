

[&lt; Back](./README.md)

# *trait* Events_Handler

Trait adding events related features, in order to be able to listen and trigger custom events.

## Properties:

* **Object** *$events_callbacks* Collection of events and their callbacks listened by current instance.

<a name="toc_off"></a><a name="toc_on"></a><a name="toc_trigger"></a>

## Public methods:
* [off](#off)([event_name], [callback])
* [on](#on)(event_name, callback)
* [trigger](#trigger)([event_name], [detail={}])

___

## <a name="on"></a>*public*  on(event_name, callback) [:arrow_heading_up:](#toc_on)

Add an event listener.

### Params:

* **String** *event_name* Name of the event to listen.
* **Function** *callback* Function to call when `event_name` is triggered. It receive a **JSGLibEvent** as parameter.

### Return:

**[Element](./../core/element.md)** This instance.

### Example:
```js
myInstance.on('my_event_name', (e) => {
 console.log(e);
 // ...
});
```

## <a name="off"></a>*public*  off([event_name], [callback]) [:arrow_heading_up:](#toc_off)

Remove one or multiple events listeners.

### Params:

* **String** *[event_name]* Name of the event to remove. If omitted, all events will be removed.
* **Function** *[callback]* Function to remove from specific `event_name`. If omitted, all listeners from `event_name` will be removed.

### Return:

**[Element](./../core/element.md)** This instance.

### Examples:
* Example 1
```js
myInstance.off();
```
* Example 2
```js
myInstance.off('my_event_name');
```
* Example 3
```js
myInstance.off('my_event_name', myCallback);
```

## <a name="trigger"></a>*public*  trigger([event_name], [detail={}]) [:arrow_heading_up:](#toc_trigger)

Trigger the specific event and execute the registered corresponding callbacks.

### Params:

* **String** *[event_name]* Name of the event to trigger.
* **Object** *[detail={}]* Details of the event to send.

### Return:

**Event** A custom **JSGLibEvent**.

### Examples:
* Example 1
```js
myInstance.trigger('my_event_name');
```
* Example 2
```js
myInstance.trigger('my_event_name', { someData: 'someValue' });
```

[&lt; Back](./README.md)
