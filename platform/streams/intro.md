## Streams

In an event-based platform such as Node.js, the most efficient way to handle I/O is in real time, consuming the input as soon as it is available and sending the output as soon as it is produced by the application.

Streams

They are like channels where the data flows. Streams can be readable, writeable, or both. All streams are instances of EventEmitter. They emit events that can be used to read and write data. However, we can consume streams data in a simpler way using the pipe method.

Types of streams

- Readable - streams from which data can be read (for example fs.createReadStream()).
- Writable - streams to which data can be written (for example fs.createWriteStream()).
- Duplex - streams that are both Readable and Writable (for example net.Socket).
- Transform - Duplex streams that can modify or transform the data as it is written and read (for example zlib.createDeflate()).

Buffering

Both Writable and Readable streams will store data in an internal buffer that can be retrieved using writable.\_writableState.getBuffer() or readable.\_readableState.buffer, respectively.
Every readable has to be consumed if not data will sit in the internal queue and if reaches the threshold will stop reading until is consumed. (readable.read())
Every Writable stream when reached the threshold writable.write() will return false.

Key points

Streams are really powerful when working with large amounts of data, or data that’s coming from an external source one chunk at a time.

## Buffering vs Streaming

There are two major categories:

- Spatial efficiency
- Time efficiency
- Composability
- Flexibility

### Spatial efficiency

Streams allow us to do things that would not be possible, by buffering data and processing it all at once.
Buffers in V8 cannot be bigger than 0x3FFFFFFF bytes (a little bit less than 1GB).

### Time efficiency

There is no need to wait for the previous set of tasks to be completed; instead, another assembly line is launched in parallel. This works perfectly because each task that we execute is asynchronous, so it can be parallelized by Node.js.

### Composability

The pipe() method, which allows us to connect the different processing units, each being responsible for one single functionality in perfect Node.js style.
The only prerequisite is that the next stream in the pipeline has to support the data type produced by the previous stream, which can be either binary, text, or even objects.

### Flexibility

One of the reasons why streams are so flexible is the fact that they can not only handle binary data, but almost any JavaScript value; in fact, they can support two operating modes:

- Binary mode: This mode is where data is streamed in the form of chunks, such as buffers or strings
- Object mode: This mode is where the streaming data is treated as a sequence of discrete objects (allowing us to use almost any JavaScript value)

<!-- TODO: Examples of duplex and transform -->
