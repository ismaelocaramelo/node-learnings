## Promises

In very simple terms, promise is an abstraction that allows a function to return an object called promise, which represents the eventual result of an asynchronous operation. In the promises jargon, we say that a promise is pending when the asynchronous operation is not yet complete, it's fulfilled when the operation successfully completes, and rejected when the operation terminates with an error. Once a promise is either fulfilled or rejected, it's considered settled.

To receive the fulfillment value or the error (reason) associated with the rejection, we can use the then() method of the promise. The following is its signature:

> promise.then([onFulfilled], [onRejected])

To create a promise:

new Promise((resolve, reject) => {})
