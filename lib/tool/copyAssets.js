const { exec } = require('child_process');
const path = require('path');

module.exports = () => {
  const src = `${global.__ROOT_PATH__}/assets/*`;
  const dist = path.resolve(global.__ROOT_PATH__, 'dist');

  console.log(`copy from ${src} to ${dist}`);
  exec(`cp -rf ${src} ${dist}`);
};
