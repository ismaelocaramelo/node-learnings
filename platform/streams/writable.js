const faker = require("faker");

require("http")
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    while (faker.random.boolean()) {
      res.write(faker.lorem.text() + "\n");
    }
    res.end("\nThe end...\n");
    res.on("finish", () => console.log("All data was sent"));
  })
  .listen(8080, () => console.log("Listening on http://localhost:8080"));
