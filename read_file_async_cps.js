const fs = require('fs');

// Continuation-passing style.
const readFileCPS = (path, cb) => {
  fs.readFile(path.trim(), (err, data) => {
    const result = data.toString();
    cb(result);
  });
};

const composeCPS = (g, f) => {
  return (x, cb) => {
    g(x, y => {
      f(y, z => {
        cb(z);
      });
    });
  };
};

const readFileContent = composeCPS(readFileCPS, readFileCPS);
readFileContent('./file1', result => {
  console.log(result);
});

// Higher order function.
const readFileHOF = path => cb => {
  readFileCPS(path, cb);
};

const composeHOF = (g, f) => {
  return x => cb => {
    g(x)(y => {
      f(y)(cb);
    });
  };
};

const readFileContentHOF = composeHOF(readFileHOF, readFileHOF);
readFileContentHOF('./file1')(result => {
  console.log(result);
});
