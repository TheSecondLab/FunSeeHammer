const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const merge = require('webpack-merge');
const path = require('path');
// const fs = require('fs');

const webpackBase = require('./webpack.base');

// const getExternals = () => fs.readdirSync(path.resolve(__dirname, '../../FunSeeBoilerplate/node_modules'))
//   .filter(filename => !filename.includes('.bin'))
//   .filter(filename => !filename.includes('funsee'))
//   .reduce((externals, filename) => {
//     externals[filename] = `commonjs ${filename}`;
//     return externals;
//   }, {});

// for test
// global.__ROOT_PATH__ = global.__ROOT_PATH__ || '/Users/robin/Documents/project/FS/FunSeeBoilerplate';
// global.__FS_PATH__ = global.__FS_PATH__ || '/Users/robin/Documents/project/FS/FunSee';

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
          },
          {
            loader: 'postcss-loader',
            options: {
              // set the config file path  of postcss
              config: {
                path: path.resolve(global.__FS_PATH__, '../funsee-hammer/postcss.config.js')
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              module: true
            }
          }
        ]
      }, {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader?importLoaders=1'
      }
    ]
  }
});

// const serverConfig = merge(webpackBase, {
//   name: 'serverConfig',
//   entry: [path.resolve(global.__ROOT_PATH__, 'funsee.js')],
//   output: {
//     filename: 'server.js',
//     path: path.resolve(global.__ROOT_PATH__, './dist'),
//     libraryTarget: 'commonjs2'
//   },
//   target: 'node',
//   node: {
//     __filename: true,
//     __dirname: true
//   },
//   externals: getExternals()
// });


// module.exports = [clientConfig, serverConfig];
module.exports = clientConfig;
