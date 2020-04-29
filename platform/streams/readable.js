//Ways of receiving data from readable stream: non-flowing and flowing.

// Non-flowing
// The default pattern for reading from a Readable stream
// consists of attaching a listener for the readable
// event that signals the availability of new data to read.
// Then, in a loop, we read all the data until the internal
// buffer is emptied.

process.stdin
  .on("readable", () => {
    let chunk;
    console.log("New data available");
    while ((chunk = process.stdin.read()) !== null) {
      console.log(`Chunk read: (${chunk.length}) "${chunk.toString()}"`);
    }
  })
  .on("end", () => process.stdout.write("End of stream"));

// The data is read exclusively from within the readable listener,
// which is invoked as soon as new data is available.
// The read() method returns null when there is no more data
// available in the internal buffers; in such a case, we have to wait
// for another readable event to be fired, telling us that we can read
// again or wait for the end event that signals the end of the stream.
// When a stream is working in binary mode, we can also specify that
// we are interested in reading a specific amount of data by passing a
// size value to the read() method.

// To use example: cat intro.md | node readable

// Flowing mode
// Attaching a listener to the data event

process.stdin
  .on("data", (chunk) => {
    console.log("New data available");
    console.log(`Chunk read: (${chunk.length}) "${chunk.toString()}"`);
  })
  .on("end", () => process.stdout.write("End of stream"));

// Offers less flexibility to control the flow of data
