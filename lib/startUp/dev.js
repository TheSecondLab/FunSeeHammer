require('babel-polyfill');
require('babel-register')({
  presets: ['env', 'react'],
  plugins: ['add-module-exports'],
  ignore: /node_modules\/(?!funsee)/
});

const { initGlobalVariable } = require('../tool/initial');

initGlobalVariable();

const webpackConfig = require('../../webpack/webpack.dev');
console.log('eeeee', webpackConfig.entry)

const path = require('path');
const webpack = require('webpack');
// const koaWebpack = require('koa-webpack');
// const koaWebpackDevServer = require('koa-webpack-dev-middleware');
// const requireFromString = require('require-from-string');

const compiler = webpack(webpackConfig);

const findCompiler = (compilers, name) => {
  let result = null;
  if (compilers && Array.isArray(compilers.compilers)) {
    result = compilers.compilers.find(_compiler => _compiler.name === name);
  } else if (compilers && compilers.name === name) {
    result = compilers;
  }

  if (!result) {
    throw new Error(`No webpack compiler found named '${name}', please check your configuration.`)
  }
  return result;
};

module.exports = ({ filename } = {}) => {
  const appGen = require(path.resolve(process.cwd(), filename || 'funsee.js'));

  // const webpackConfig = require('../../webpack/webpack.dev');
  // const compiler = webpack(webpackConfig);
  const app = appGen({
    middleware: [{
      name: require('koa-webpack'),
      desc: 'koa-webpack',
      param: {
        compiler
      }
    }]
  }, false);

  // console.log('webpackConfig', webpackConfig)
  // const app = appGen({}, false);
  // app.use(koaWebpackDevServer(compiler));
  // let started = false;

  // compiler.plugin('done', () => {
    
    
  //   const _compiler = findCompiler(compiler,'serverConfig');
  //   const buffer = _compiler.outputFileSystem.readFileSync(`${_compiler.outputPath}/${_compiler.options.output.filename || 'main.js'}`);
  //   const code = requireFromString(buffer.toString())
  //   const _app = code({}, false);
  //   _app.initializeFunSee();
  //   if (started) { return; }
  //   started = true;
  //   _app.startup();
  // })
  // console.log('root', global.__ROOT_PATH__)
  // app.initializeFunSee();

  app.startup(8080);

  // compiler.run((err, state) => {
  //   const app = require(`${process.cwd()}/dist/server.js`);
  //   console.log(app());

  //   app({
  //     middleware: [{
  //       name: require('koa-webpack'),
  //       desc: 'koa-webpack',
  //       param: {
  //         compiler,
  //         dev: {
  //           publicPath: '/'
  //         }
  //       }
  //     }]
  //   }).startup();
  // });
};
