## Observer pattern

> The EventEmitter class allows us to register one or more functions as listeners, which will be invoked when a particular event type is fired.

### Synchronous and asynchronous events

As with callbacks, events can be emitted synchronously or asynchronously. It is crucial that we never mix the two approaches in the same EventEmitter, but even more important, when emitting the same event type, to avoid producing the same problems that we described in the Unleashing Zalgo section.

The main difference between emitting synchronous and asynchronous events lies in the way listeners can be registered. When the events are emitted asynchronously, the program has all the time to register new listeners even after EventEmitter is initialized, because the events are guaranteed not to be fired until the next cycle of the event loop.

On the contrary, emitting events synchronously requires that all the listeners are registered before the EventEmitter function starts to emit any event. Let's look at an example:

```javascript
const EventEmitter = require("events").EventEmitter;
class SyncEmit extends EventEmitter {
  constructor() {
    super();
    this.emit("ready");
  }
}
const syncEmit = new SyncEmit();
syncEmit.on("ready", () => console.log("Object is ready to be used"));
```

If the ready event was emitted asynchronously, then the previous code would have worked perfectly; however, the event is produced synchronously and the listener is registered after the event was already sent, so the result is that the listener is never invoked; the code will print nothing to the console.

### EventEmitter versus callbacks

The general differentiating rule is semantic: callbacks should be used when a result must be returned in an asynchronous way; events should instead be used when there is a need to communicate that something has just happened.

```javascript
function helloEvents() {
  const eventEmitter = new EventEmitter();
  setTimeout(() => eventEmitter.emit("hello", "hello world"), 100);
  return eventEmitter;
}
function helloCallback(callback) {
  setTimeout(() => callback("hello world"), 100);
}
```

As a first observation, we can say that callbacks have some limitations when it comes to supporting different types of events. In fact, we can still differentiate between multiple events by passing the type as an argument of the callback, or by accepting several callbacks, one for each supported event. However, this cannot exactly be considered an elegant API. In this situation, EventEmitter can give a better interface and leaner code.

Another case where EventEmitter might be preferable is when the same event can occur multiple times, or not occur at all. A callback, in fact, is expected to be invoked exactly once, whether the operation is successful or not. The fact that we have a possibly repeating circumstance should let us think again about the semantic nature of the occurrence, which is more similar to an event that has to be communicated rather than a result; in this case EventEmitter is the preferred choice.

Lastly, an API using callbacks can notify only a particular callback, while using an EventEmitter function is possible for multiple listeners to receive the same notification.

## Combining callbacks and EventEmitt

Create a function that accepts a callback and returns EventEmitter, thus providing a simple and clear entry point for the main functionality, while emitting more fine-grained events using EventEmitter.
