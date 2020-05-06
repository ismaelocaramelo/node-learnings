const faker = require("faker");

/* 
  Node.js streams can also suffer from bottlenecks, 
  where data is written faster than the stream can consume it.
  this problem consists of buffering the incoming data; 
  however, if the stream doesn't give any feedback to the writer,
  we might incur a situation where more and more data is accumulated 
  into the internal buffer, leading to undesired levels of memory usage.
*/

require("http")
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    function generateMore() {
      while (faker.random.boolean()) {
        const shouldContinue = res.write(
          faker.lorem.text().repeat(1000) + "\n"
        );

        if (!shouldContinue) {
          console.log("Backpressure");
          return res.once("drain", generateMore);
        }
      }
      res.end("\nThe end...\n", () => console.log("All data was sent"));
    }

    generateMore();
  })
  .listen(8080, () => console.log("Listening on http://localhost:8080"));

/* 

To prevent this from happening, writable.write() will return false when the 
internal buffer exceeds the highWaterMark limit. 
Writable streams have a highWaterMark property, which is the limit of the 
internal buffer size beyond which the write() method starts returning false, 
indicating that the application should now stop writing. 
When the buffer is emptied, the drain event is emitted, 
communicating that it's safe to start writing again. 
This mechanism is called back-pressure.
*/
