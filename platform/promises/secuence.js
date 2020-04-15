const generateFakePromise = ({ delay, value }) =>
  new Promise((resolve) => setTimeout(resolve, delay, value));

const tasks = [
  () => generateFakePromise({ value: "1", delay: 300 }),
  () => generateFakePromise({ value: "2", delay: 300 }),
  () => generateFakePromise({ value: "3", delay: 300 }),
  () => generateFakePromise({ value: "last result", delay: 300 }),
];

const sequence1 = () => {
  let promise = Promise.resolve();

  tasks.forEach((task) => {
    promise = promise.then(task).then(console.log);
  });

  promise.then(() => {
    console.log("All task completed");
  });
};

const sequence2 = () => {
  promise = tasks.reduce(
    (prev, task) => prev.then(task).then(console.log),
    Promise.resolve()
  );
  promise.then((result2) => {
    console.log("All task completed v2");
  });
};

sequence1();
sequence2();
