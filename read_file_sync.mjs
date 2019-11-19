import fs from 'fs';

const add1 = x => x + 1;
const mul3 = x => x * 3;

const composeF = (f, g) => {
  return x => g(f(x));
};

const addOneThenMul3 = composeF(add1, mul3);

console.log(addOneThenMul3(4));

//Read file content.
const readFileSync = path => {
  return fs.readFileSync(path.trim()).toString();
};

const readFileContentSync = composeF(readFileSync, readFileSync);

console.log(readFileContentSync('./file1'));