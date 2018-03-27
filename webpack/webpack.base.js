const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { combineClientRouter, combineClientReducer, combineSaga } = require('../lib/tool/combine');

// collect client router、reducer、saga config
const clientRouters = combineClientRouter(`${global.__ROOT_PATH__}/shared/page`);
const clientReducers = combineClientReducer(`${global.__ROOT_PATH__}/shared/page`);
const clientSagas = combineSaga(`${global.__ROOT_PATH__}/shared/page`);

global.__CLIENT_ROUTER__ = clientRouters;
global.__CLIENT_REDUCER__ = clientReducers;
global.__CLIENT_SAGA__ = clientSagas;

// trace FunSee's folder
const sharedRelativePath = path.relative(`${global.__FS_PATH__}/lib/tool/clientRouterCreator.js`, `${global.__ROOT_PATH__}/shared/page`).replace('../', '');
global.__RELATIVE_PATH__ = sharedRelativePath;

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules\/(?!funsee)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: [
            require('babel-plugin-add-module-exports'),
            require('babel-plugin-transform-export-extensions'),
            require('babel-plugin-transform-object-rest-spread'),
            ['import', { libraryName: 'antd', style: 'css' }]
          ]
        }
      }
      // loader: 'babel-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }]
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(global.__ROOT_PATH__, 'dist')]),
    new webpack.DefinePlugin({
      'global.__CLIENT_ROUTER__': JSON.stringify(clientRouters),
      'global.__CLIENT_REDUCER__': JSON.stringify(clientReducers),
      'global.__CLIENT_SAGA__': JSON.stringify(clientSagas),
      'global.__ROOT_PATH__': JSON.stringify(global.__ROOT_PATH__),
      'global.__RELATIVE_PATH__': JSON.stringify(sharedRelativePath),
      __WEBPACK_REPLACE_IS_PRD__: JSON.stringify(process.env.NODE_ENV !== 'dev')
    })
  ]
};
