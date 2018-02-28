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

  return router;
};

const combineClientReducer = (dir) => {
  const reducers = {};

  rd.readFilterSync(dir, /(reducer.js)$/).forEach((file) => {
    reducers[`${file.replace(`${dir}/`, '').replace('/reducer.js', '').replace('/', '_')}`] = `${file.replace(`${dir}/`, '')}`;
  });

  return reducers;
};

const combineSaga = dir => rd.readFilterSync(dir, /(saga.js)$/).map(file => `${file.replace(`${dir}/`, '')}`);

module.exports = {
  combineClientRouter,
  combineClientReducer,
  combineSaga
};
