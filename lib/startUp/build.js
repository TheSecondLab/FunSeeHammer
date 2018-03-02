const webpack = require('webpack');

const { initGlobalVariable } = require('../tool/initial');

initGlobalVariable();


const config = require('../../webpack/webpack.prod');

module.exports = () => {
  webpack(config).run((err, state) => {
    console.log('done');

    if (err) {
      return console.error(err);
    }

    if (state.hasErrors()) {
      console.log('FunSeeHammer[build]: ERROR\n');
      console.log(state.toString({
        hash: false,
        version: true,
        children: true,
        assets: false,
        chunks: false,
        chunkModules: false,
        colors: true
      }));
      return;
    }

    console.log('FunSeeHammer[build]: SUCCES\n');

    const app = require(`${process.cwd()}/dist/server.js`);
    console.log(app());

    app().startup();

    // webpack 常规显示方式
    console.log(state.toString({
      hash: false,
      version: true,
      children: false,
      assets: true,
      assetsSort: 'name',
      chunks: false,
      chunkModules: false,
      colors: true
    }));
  });
}