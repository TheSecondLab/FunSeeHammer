const webpack = require('webpack');
const path = require('path');
const { combineClientRouter, combineClientReducer, combineSaga } = require('../lib/tool/combine');

const clientRouters = combineClientRouter(`${global.__ROOT_PATH__}/shared`);
const clientReducers = combineClientReducer(`${global.__ROOT_PATH__}/shared`);
const clientSagas = combineSaga(`${global.__ROOT_PATH__}/shared`);

global.__CLIENT_ROUTER__ = clientRouters;
global.__CLIENT_REDUCER__ = clientReducers;
global.__CLIENT_SAGA__ = clientSagas;

const sharedRelativePath = path.relative(`${global.__FS_PATH__}/lib/tool/clientRouterCreator.js`, `${global.__ROOT_PATH__}/shared`).replace('../', '');
global.relativePath = sharedRelativePath;

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules\/(?!funsee)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: [require('babel-plugin-add-module-exports'), require('babel-plugin-transform-runtime'), require('babel-plugin-transform-export-extensions')]
        }
      }
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      __WEBPACK_REPLACE_CLIENT_ROUTER__: JSON.stringify(clientRouters),
      __WEBPACK_REPLACE_CLIENT_REDUCER__: JSON.stringify(clientReducers),
      __WEBPACK_REPLACE_CLIENT_SAGA__: JSON.stringify(clientSagas),
      __WEBPACK_REPLACE_ROOT_PATH__: JSON.stringify(global.__ROOT_PATH__),
      __WEBPACK_REPLACE_SHARDED_RELATIVE_PATH__: JSON.stringify(sharedRelativePath),
      __WEBPACK_REPLACE_IS_PRD__: JSON.stringify(process.env.NODE_ENV !== 'dev')
    })
  ]
};
