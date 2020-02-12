# The module system and its patterns

> The main mechanism to enforce information hiding by keeping private all the functions and variables that are not explicitly marked to be exported.

Patterns:

- [Named Exports](#namedexports)
- [Exporting a function](#ExportingAFunction)
- [Exporting a constructor](#ExportingAConstructor)
- [Exporting an instance](#ExportingAInstance)
- [Modifying other modules](#ModifyingOtherModules)
- [The Observer Pattern](#TheObserverPattern)

### Named Exports

> Consist of assigning all the values we want to make public to properties of the object referenced by exports. In this way, the resulting exported object becomes a container or namespace for a set of related functionality.

```javascript
exports.info = (message) => {
 console.log('info: ' + message); };
}

exports.verbose = (message) => {       console.log('verbose: ' + message);
};
```

### Exporting a function

> Its main strength is the fact that it exposes only a single functionality, which provides a clear entry point for the module, making it simpler to understand and use; it also honors the principle of small surface area very well. Also known as **substack pattern,**

```javascript
module.exports.verbose = message => {
  console.log(`verbose: ${message}`);
};
```

### Exporting a constructor

```javascript
//file logger.js
function Logger(name) {
  if (!(this instanceof Logger)) {
    return new Logger(name);
  }
  this.name = name;
}
Logger.prototype.log = function(message) {
  console.log(`[${this.name}] ${message}`);
};
Logger.prototype.info = function(message) {
  this.log(`info: ${message}`);
};
Logger.prototype.verbose = function(message) {
  this.log(`verbose: ${message}`);
};
module.exports = Logger;
```

### Exporting an instance

```javascript
function Logger(name) {
  this.count = 0;
  this.name = name;
}
Logger.prototype.log = function(message) {
  this.count++;
  console.log("[" + this.name + "] " + message);
};
module.exports = new Logger("DEFAULT");
```

> Because the module is cached, every module that requires the logger module will actually always retrieve the same instance of the object, thus sharing its state. This pattern is very much like creating a singleton; however, it does not guarantee the uniqueness of the instance across the entire application, as it happens in the traditional singleton pattern.

> When analyzing the resolving algorithm, we have seen in fact, that a module might be installed multiple times inside the dependency tree of an application.

### Modifying other modules or the global scope

> This pattern can be useful and safe under some circumstances (for example, for testing). Also knowkn as **monkey patching**. It generally refers to the practice of modifying the existing objects at runtime to change or extend their behavior or to apply temporary fixes.

```javascript
//file patcher.js
// ./logger is another module
require("./logger").customMessage = () =>
  console.log("This is a new functionality");

//file main.js
require("./patcher");
const logger = require("./logger");
logger.customMessage();
```

### The observer pattern

> Pattern (observer) defines an object (called subject), which can notify a set of observers (or listeners), when a change in its state happens.

<!-- TODO: Add more The obsever pattern  -->
