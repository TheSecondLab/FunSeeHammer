require('babel-polyfill');
require('babel-register')({
  presets: ['env', 'react'],
  plugins: ['add-module-exports', 'transform-object-rest-spread', 'transform-decorators-legacy'],
  ignore: /node_modules\/(?!funsee)/
});

// A require hook to compile CSS Modules in runtime
require('css-modules-require-hook')({
  extensions: ['.scss', '.css'],
  preprocessCss: (data, filename) =>
    require('node-sass').renderSync({
      data,
      file: filename
    }).css,
  camelCase: true,
  generateScopedName: '[path][name]__[local]'
});

const { initGlobalVariable } = require('../tool/initial');

initGlobalVariable();

const webpackConfig = require('../../webpack/webpack.dev');

const path = require('path');
const webpack = require('webpack');

const compiler = webpack(webpackConfig);

const appGen = require(path.resolve(process.cwd(), 'funsee.js'));
const clearFolder = require('../tool/clearFolder');
const copyAssets = require('../tool/copyAssets.js');

clearFolder(path.resolve(__dirname, 'dist'));

const app = appGen({
  middleware: [{
    name: require('koa-webpack'),
    desc: 'koa-webpack',
    param: {
      compiler
    }
  }]
}, false);

copyAssets();

app.startup(8080);
