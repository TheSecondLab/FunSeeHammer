const babylon = require('babylon');
const fs = require('fs');
const path = require('path');

const testCode = fs.readFileSync(path.resolve(__dirname, '../FunSee/index.js')).toString();
console.log(testCode);
const ast = babylon.parse(testCode);

console.log(ast);
