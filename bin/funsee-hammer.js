#!/usr/bin/env node

/* eslint no-unused-expressions: "off" */

const yargs = require('yargs');
const { version } = require('../package.json');

yargs
  .version(version)
  .command('dev [filename]', 'run the server', (_yargs) => {
    _yargs
      .positional('filename', {
        describe: 'dev: startup file',
        type: 'string'
      })
      .version(false);
  }, () => {
    require('../lib/startUp/nodemon');
  })
  .command('build', 'run the server', (argv) => {
    require('../lib/startUp/build')(argv);
  })
  .argv;
