const rd = require('rd');
const path = require('path');

/**
 * 收集客户端路由
 *
 * 传入一个文件目录，通过rd找到所有匹配规则的文件，从配置文件中拿到此文件的<文件夹名称>和<container的名称>
 *
 * @param    {String}  dir     文件地址
 * @returns  客户端路由配置 提供给 clientRouterCreator, 最终提供给react-router-config
 *
 * @date     2018-3-9
 * @author   zhaoxing<jiyiwohanxing@gmail.com>
 */
const combineClientRouter = (dir) => {
  const router = []; // 子路由
  const rootRouter = []; // 嵌套根路由

  const getComponent = (file, dirName, comp) => path.join(file.replace(`${dirName}/`, '').replace('/moduleConfig.js', ''), comp);

  rd.readFilterSync(dir, /(moduleConfig.js)$/)
    .forEach((file) => {
      const mConfig = require(file);
      const { containers } = mConfig;
      containers.forEach((container) => {
        if (~file.indexOf('app')) {
          rootRouter.push({
            path: '/',
            component: getComponent(file, dir, container.component)
          });
        }

        router.push({
          path: `/${file.replace(`${dir}/`, '').replace('/moduleConfig.js', '')}${container.path || '/'}`,
          component: getComponent(file, dir, container.component)
        });
      });
    });
  return {
    router,
    rootRouter
  };
};

/**
 * 收集reducer
 *
 * 传入一个文件目录，通过rd找到所有匹配规则的文件，以文件名为key，多级目录用'_'连接
 * Q: 此处reducer结构有些问题，每个一级模块应该是一个独立的活动或者一个小项目，可能存在公用数据，现在的做法数据太过分散了
 *
 * @param    {String}  dir     文件地址
 * @returns   reducer结构
 *
 * @date     2018-3-9
 * @author   zhaoxing<jiyiwohanxing@gmail.com>
 */
const combineClientReducer = (dir, excludePath) => {
  const reducers = {};

  rd.readFilterSync(dir, /(reducer.js)$/).forEach((file) => {
    if(file.indexOf(excludePath) !== -1) return;
    reducers[`${file.replace(`${dir}/`, '').replace('/reducer.js', '').replace('/', '_')}`] = `${file.replace(`${dir}/`, '')}`;
  });

  return reducers;
};

const combineSaga = (dir, excludePath) => {
  const saga = [];
  rd.readFilterSync(dir, /(saga.js)$/).forEach(file => {
    if(file.indexOf(excludePath) !== -1) return;
    saga.push(`${file.replace(`${dir}/`, '')}`);
  });

  return saga;
}
module.exports = {
  combineClientRouter,
  combineClientReducer,
  combineSaga
};
