## Principles

- Small core
- Small modules
- Small surface area
- Simplicity and pragmatism

### Small core

This is one of the most important foundations built having the smallest set of functionalities, leaving the rest to the so-called userland, the ecosystem of modules living outside the core.

### Small modules

Module means a way to structure the code. That's from Unix:

- Small is beautiful
- Make each program do one thing well

A small module is also considered to be the following:

- Easier to understand and use
- Simpler to test and maintain
- Perfect to share with the browser

### Small surface area

Exposing a minimal set of functionalities. API becomes clearer to use and is less exposed to erroneous usage. A common patterns for defining modules is to expose one piece of functionality.

### Simplicity and pragmatism

In the The Rise of “Worse is Better”, we can find the following:

**The design must be simple, both in implementation and interface. It is more important for the implementation to be simple than the interface. Simplicity is the most important consideration in a design**
