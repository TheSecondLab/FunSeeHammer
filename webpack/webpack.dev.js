const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const merge = require('webpack-merge');
const path = require('path');

const webpackBase = require('./webpack.base');

// for test
global.__ROOT_PATH__ = global.__ROOT_PATH__ || '/Users/robin/Documents/project/FS/FunSeeBoilerplate';
global.__FS_PATH__ = global.__FS_PATH__ || '/Users/robin/Documents/project/FS/FunSee';

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
    new HtmlWebpackPlugin({
      template: path.resolve(global.__ROOT_PATH__, './views/default.html'),
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin()
  ]
});
