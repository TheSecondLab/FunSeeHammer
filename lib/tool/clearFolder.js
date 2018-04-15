const fs = require('fs');
const rimraf = require('rimraf');

module.exports = (path) => {
  console.log(`clearing folder: ${path}`);
  rimraf(path, (e) => {
    if (e) {
      console.error(`remove ${path} failed, Please check below errors: \n${e}`);
    }

    fs.mkdirSync(path);
  });
};
