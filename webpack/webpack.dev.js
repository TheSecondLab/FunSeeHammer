const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const merge = require('webpack-merge');
const path = require('path');

const webpackBase = require('./webpack.base');

const clientConfig = merge(webpackBase, {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    `${global.__FS_PATH__}/dist/client/index.js`
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
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: '[path][name]__[local]'
            }
          }, {
            loader: 'sass-loader',
            options: {
              module: true
            }
          }
        ]
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
});

module.exports = clientConfig;
