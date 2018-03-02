#!/usr/bin/env node

const yargs = require('yargs');
const { version } = require('../package.json');

const { argv } = yargs;

yargs
  .version(version)
  .command('dev [filename]', 'run the server', (yargs) => {
    yargs
      .positional('filename', {
        describe: 'dev: startup file',
        type: 'string'
      })
      .version(false);
  }, (argv) => {
    require('../lib/startUp/dev')(argv);
  })
  .command('build', 'run the server', (argv) => {
    require('../lib/startUp/build')(argv);
  }).argv;
