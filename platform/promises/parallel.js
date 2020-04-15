const generateFakePromise = ({ delay, value }) =>
  new Promise((resolve) => setTimeout(resolve, delay, value));

const tasks = [
  generateFakePromise({ value: "1", delay: 100 }),
  generateFakePromise({ value: "2", delay: 0 }),
  generateFakePromise({ value: "3", delay: 300 }),
  generateFakePromise({ value: "last result", delay: 300 }),
];

// The order of the promises is maintained.
Promise.all(tasks).then(console.log);
