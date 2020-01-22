## The callback

> Callbacks are functions that are invoked to propagate the result of an operation and this is exactly what we need when dealing with asynchronous operations.

Synchronous or asynchronous?

In general, what must be avoided is creating inconsistency and confusion around the nature of an API, as doing so can lead to a set of problems which might be very hard to detect and reproduce.

One of the most dangerous situations is to have an API that behaves synchronously under certain conditions and asynchronously under others.

```javascript
const fs = require("fs");
const cache = {};
function inconsistentRead(filename, callback) {
  if (cache[filename]) {
    //invoked synchronously
    callback(cache[filename]);
  } else {
    //asynchronous function
    fs.readFile(filename, "utf8", (err, data) => {
      cache[filename] = data;
      callback(data);
    });
  }
}
```

In fact, we can state that it is always best practice to implement a synchronous API using a direct style; this will eliminate any confusion around its nature and will also be more efficient from a performance perspective.

## Callbacks come last

```javascript
fs.readFile(filename, [options], callback);
```

## Error comes first

> In CPS, errors are propagated as any other type of result, which means using callbacks. In Node.js, any error produced by a CPS function is always passed as the first argument of the callback, and any actual result is passed starting from the second argument. If the operation succeeds without errors, the first argument will be null or undefined.

> Another important convention to take into account is that the error must always be of type Error. This means that simple strings or numbers should never be passed as error objects.

```javascript
fs.readFile("foo.txt", "utf8", (err, data) => {
  if (err) handleError(err);
  else processData(data);
});
```

## Propagating errors

Propagating errors in synchronous, direct style functions is done with the well-known throw statement, which causes the error to jump up in the call stack until it is caught.

In asynchronous CPS however, proper error propagation is done by simply passing the error to the next callback in the chain. The typical pattern looks as follows:

```javascript
const fs = require("fs");
function readJSON(filename, callback) {
  fs.readFile(filename, "utf8", (err, data) => {
    let parsed;
    if (err)
      //propagate the error and exit the current function
      return callback(err);
    try {
      //parse the file contents parsed = JSON.parse(data);
    } catch (err) {
      //catch parsing errors
      return callback(err);
    }
    //no errors, propagate just the data
    callback(null, parsed);
  });
}
```

## Uncaught exceptions

Throwing inside an asynchronous callback will cause the exception to jump up to the event loop and never be propagated to the next callback.

In Node.js, this is an unrecoverable state and the application will simply shut down printing the error to the stderr interface.

The following code shows the anti-pattern that we just described:

```javascript
try {
  readJSONThrows("nonJSON.txt", function(err, result) {});
} catch (err) {
  console.log("This will not catch the JSON parsing exception");
}
```

Node.js emits a special event called uncaughtException just before exiting the process. The following code shows a sample use case:

```javascript
process.on("uncaughtException", err => {
  console.error(
    "This will catch at last the " + "JSON parsing exception: " + err.message
  );
  // Terminates the application with 1 (error) as exit code: // without the following line, the application would continue process.exit(1);
});
```

It's important to understand that an uncaught exception leaves the application in a state that is not guaranteed to be consistent, which can lead to unforeseeable problems. For example, there might still be incomplete I/O requests running or closures might have become inconsistent. That's why it is always advised, especially in production, to exit from the application after an uncaught exception is received anyway.
