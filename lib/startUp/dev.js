const path = require('path');
const webpack = require('webpack');

module.exports = ({ filename } = {}) => {
  const appGen = require(path.resolve(process.cwd(), filename));
  const webpackConfig = require('../../webpack/webpack.dev');
  const compiler = webpack(webpackConfig);
  const app = appGen({
    middleware: [{
      name: require('koa-webpack'),
      desc: 'koa-webpack',
      param: {
        compiler
      }
    }]
  });


  app.startup(8080);
};
