const rd = require('rd');
const path = require('path');

const combineClientRouter = (dir) => {

  const router = [];
  rd.readFilterSync(dir, /(moduleConfig.js)$/)
    .forEach((file) => {
      const mConfig = require(file);
      const { containers } = mConfig;
      containers.forEach((container) => {
        router.push({
          path: `/${file.replace(`${dir}/`, '').replace('/moduleConfig.js', '')}${container.path || '/'}`,
          component: path.join(file.replace(`${dir}/`, '').replace('/moduleConfig.js', ''), container.component)
        });
      });
    });

  global.__CLIENT_ROUTER__ = router;
  return router;
};

module.exports = {
  combineClientRouter
};
