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

// Exec object
const readFileExec = path => {
  return {
    exec: cb => {
      readFileCPS(path, cb);
    }
  };
};

const composeExec = (g, f) => {
  return x => {
    return {
      exec: cb => {
        g(x).exec(y => {
          f(y).exec(cb);
        });
      }
    };
  };
};

const readFileContentExec = composeExec(readFileExec, readFileExec);
readFileContentExec('file1').exec(result => console.log(result));

// Create exec object
const createExecObj = exec => ({ exec });

const readFileExec2 = path => {
  return createExecObj(cb => {
    readFileCPS(path, cb);
  });
};

//The same as ComposeExec but uses execObj instead of a function.
const bindExec = (execObj, f) => {
  return createExecObj(cb => {
    execObj.exec(y => {
      f(y).exec(cb);
    });
  });
};

const readFile2Exec2 = bindExec(readFileExec2('./file1'), readFileExec2);
readFile2Exec2.exec(result => console.log(result));
