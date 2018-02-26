const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const webpackBase = require('./webpack.base');
const { combineClientRouter } = require('../lib/tool/combine');

// for test
global.__ROOT_PATH__ = global.__ROOT_PATH__ || '/Users/robin/Documents/project/FS/FunSeeBoilerplate';
global.__FS_PATH__ = global.__FS_PATH__ || '/Users/robin/Documents/project/FS/FunSee';

const clientRouters = combineClientRouter(`${global.__ROOT_PATH__}/shared`);
const sharedRelativePath = path.relative(`${global.__FS_PATH__}/lib/tool/clientRouterCreator.js`, `${global.__ROOT_PATH__}/shared`).replace('../', '');
global.relativePath = sharedRelativePath;

module.exports = merge(webpackBase, {
  devtool: 'source-map',
  entry: [
    path.relative(global.__ROOT_PATH__, `${global.__FS_PATH__}/lib/client/index.js`)
  ],
  output: {
    filename: 'test.js',
    path: path.resolve(global.__ROOT_PATH__, './dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(global.__ROOT_PATH__, './dist'),
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      __WEBPACK_REPLACE_CLIENT_ROUTER__: JSON.stringify(clientRouters),
      __WEBPACK_REPLACE_ROOT_PATH__: JSON.stringify(global.__ROOT_PATH__),
      __WEBPACK_REPLACE_SHARDED_RELATIVE_PATH__: JSON.stringify(sharedRelativePath),
      __WEBPACK_REPLACE_IS_PRD__: JSON.stringify(process.env.NODE_ENV !== 'dev')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(global.__ROOT_PATH__, './views/default.html'),
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin()
  ]
});
