const { spawn } = require('child_process');
const path = require('path');

module.exports = () => {
  spawn('cp', ['-r', path.resolve(global.__ROOT_PATH__, 'assets'), path.resolve(global.__ROOT_PATH__, 'dist')]);
};
