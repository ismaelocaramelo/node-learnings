/* 
 An observer 
 Subject --> maintains a list of observers, facilitates adding or removing observers 

  - subscribe --> to listen for a certain event
  - emit --> to emit an event
  - unsubscribe --> remove listener 

*/

const observer = () => {
  const listeners = [];

  const subscribe = listener => listeners.push(listener);

  const unsubscribe = listener => {
    const listenerIndex = listeners.indexOf(listener);
    listeners.splice(listenerIndex, 1);
  };

  const emit = event => listeners.forEach(listener => listener(event));

  return {
    subscribe,
    unsubscribe,
    emit
  };
};

const Event = observer();

const aListenerToBeRemoved = () => console.log("I'm the second subscriber");

Event.subscribe(() => console.log("I'm the first subscriber"));
Event.subscribe(aListenerToBeRemoved);
Event.subscribe(() => console.log("I'm the third subscriber"));

Event.unsubscribe(aListenerToBeRemoved);

Event.emit("Some event");
