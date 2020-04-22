const fs = require("fs");
const zlib = require("zlib");
const file = process.argv[2];

fs.readFile(file, (err, buffer) => {
  zlib.gzip(buffer, (err, buffer) => {
    fs.writeFile(file + ".gz", buffer, (err) => {
      console.log("File successfully compressed");
    });
  });
});

// If file is bigger than 1GB
//RangeError: File size is greater than possible Buffer: 0x3FFFFFFF bytes
