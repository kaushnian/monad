import fs from 'fs';

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
      })
    })
  }
};

const readFileContent = composeCPS(readFileCPS, readFileCPS);
readFileContent('./file1', result => {
  console.log(result);
});