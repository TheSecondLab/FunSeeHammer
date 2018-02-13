const path = require('path');

module.exports = ({ filename } = {}) => {
  const app = require(path.resolve(process.cwd(), filename));

  app.startup(8080);
};