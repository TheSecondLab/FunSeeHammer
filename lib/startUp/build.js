const webpack = require('webpack');
const path = require('path');
const ora = require('ora');

const { initGlobalVariable } = require('../tool/initial');
const { version } = require('../../package.json');

initGlobalVariable();

const config = require('../../webpack/webpack.prod');
const clearFolder = require('../tool/clearFolder');

clearFolder(path.resolve(process.cwd(), 'dist'));

module.exports = () => {
  console.log(`FunSeeHammer - ${version}: Start Build`);
  const spinner = ora('Production mode building...').start();
  spinner.color = 'yellow';
  webpack(config).run((err, state) => {
    if (err) {
      spinner.fail();
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
      spinner.fail();
      return;
    }

    spinner.succeed('FunSeeHammer[build]: SUCCESS');
    console.log('RUN \'npm start\' to start the server');

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
};
