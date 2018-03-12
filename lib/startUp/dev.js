require('babel-polyfill');
require('babel-register')({
  presets: ['env', 'react'],
  plugins: ['add-module-exports', 'transform-object-rest-spread'],
  ignore: /node_modules\/(?!funsee)/
});

const { initGlobalVariable } = require('../tool/initial');

initGlobalVariable();

const webpackConfig = require('../../webpack/webpack.dev');

const path = require('path');
const webpack = require('webpack');

const compiler = webpack(webpackConfig);

const appGen = require(path.resolve(process.cwd(), 'funsee.js'));

const app = appGen({
  middleware: [{
    name: require('koa-webpack'),
    desc: 'koa-webpack',
    param: {
      compiler
    }
  }]
}, false);

app.startup(8080);
