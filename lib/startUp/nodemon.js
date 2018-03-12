const nodemon = require('nodemon');
const path = require('path');

// const startFile = path.relative(`${global.__FS_PATH__}`, `${global.__FS_PATH__}/../FunSeeHammer/lib/startUp/dev`);
const startFile = path.relative(`${global.__FS_PATH__}`, `${global.__FS_PATH__}/node_modules/funsee-hammer/lib/startUp/dev`);

nodemon({
  script: startFile,
  watch: ['server']
});

// nodemon监听
nodemon.on('start', () => {
  console.log('App has started');
}).on('quit', () => {
  console.log('App has quit');
  process.exit();
}).on('restart', () => {
  console.log('App restarted due to: ', 'server/* has changed');
});
