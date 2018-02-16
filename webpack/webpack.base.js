const path = require('path');

module.exports = {
  entry: '../../FunSeeBoilerplate/server/server',
  output: {
    path: path.resolve(__dirname,'../dist'),
    filename: 'bundle.js'
  },
  target: 'node'
};
