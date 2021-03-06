const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = require('./webpack.base');

const getExternals = () => fs.readdirSync(path.resolve(__dirname, path.resolve(global.__ROOT_PATH__, 'node_modules/')))
  .filter(filename => !filename.includes('.bin'))
  .filter(filename => !filename.includes('funsee'))
  .reduce((externals, filename) => {
    externals[filename] = `commonjs ${filename}`;
    return externals;
  }, {});

const extractCss = new ExtractTextPlugin('[name].[contenthash:8]-css.css', { allChunks: true });
const extractLess = new ExtractTextPlugin('[name].[contenthash:8]-less.css', { allChunks: true });
const extractScss = new ExtractTextPlugin('[name].[contenthash:8]-scss.css', { allChunks: true });


const clientConfig = merge(baseConfig, {
  entry: [
    'babel-polyfill',
    `${global.__FS_PATH__}/dist/client/index.js`
  ],
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(global.__ROOT_PATH__, './dist'),
    publicPath: '/'
  },
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        // 最紧凑的输出
        beautify: false,
        // 删除所有的注释
        comments: false,
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句
          // 还可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true
        }
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(global.__ROOT_PATH__, './views/default.html')
    }),
    extractCss,
    extractLess,
    extractScss,
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') })
  ],
  module: {
    rules: [{
      test: /\.scss$/,
      use: extractScss.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            localIdentName: '[hash:base64:8]',
            minimize: true,
            module: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            module: true
          }
        }]
      })
    }, {
      test: /\.less$/,
      use: extractLess.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader']
      })
    }, {
      test: /\.css$/,
      use: extractLess.extract({
        fallback: 'style-loader',
        use: ['css-loader']
      })
    }]
  }
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
  externals: getExternals(),
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: 'css-loader/locals',
        options: {
          localIdentName: '[hash:base64:8]',
          minimize: true,
          module: true
        }
      }, {
        loader: 'sass-loader',
        options: {
          module: true
        }
      }]
    }, {
      test: /\.less$/,
      use: ['css-loader/locals', 'less-loader']
    }, {
      test: /\.css$/,
      use: ['css-loader/locals']
    }]
  }
});


module.exports = [clientConfig, serverConfig];
// module.exports = clientConfig;
