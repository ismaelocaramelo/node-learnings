// Sync way
const EventEmitter = require("events").EventEmitter;

const SyncEventEmitter = new EventEmitter();

SyncEventEmitter.on("ready", () => console.log("SyncEventEmitter is ready"));

SyncEventEmitter.emit("ready");

SyncEventEmitter.on("ready", () => console.log("Never gets here"));

// Async way

const AsyncEventEmitter = new EventEmitter();

AsyncEventEmitter.on("ready", () => console.log("AsyncEventEmitter is ready"));

setImmediate(() => AsyncEventEmitter.emit("ready"));

AsyncEventEmitter.on("ready", () =>
  console.log("AsyncEventEmitter gets here too")
);
