const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const baseConfig = require('./webpack.base');

const getExternals = () => fs.readdirSync(path.resolve(__dirname, '../../FunSeeBoilerplate/node_modules'))
  .filter(filename => !filename.includes('.bin'))
  .filter(filename => !filename.includes('funsee'))
  .reduce((externals, filename) => {
    externals[filename] = `commonjs ${filename}`;
    return externals;
  }, {});

const clientConfig = merge(baseConfig, {
  entry: [
    'babel-polyfill',
    `${global.__FS_PATH__}/lib/client/index.js`
  ],
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(global.__ROOT_PATH__, './dist'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(global.__ROOT_PATH__, './views/default.html')
    })
  ]
});

const serverConfig = merge(baseConfig, {
  entry: [
    'babel-polyfill',
    path.resolve(global.__ROOT_PATH__, 'funsee.js')
  ],
  output: {
    filename: 'server.js',
    path: path.resolve(global.__ROOT_PATH__, './dist'),
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  externals: getExternals()
});


module.exports = [clientConfig, serverConfig];
// module.exports = clientConfig;
