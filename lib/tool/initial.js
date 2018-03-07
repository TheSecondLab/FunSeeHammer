const rd = require('rd');

/**
 * 初始化global变量
 *
 * 项目启动初期， 为NodeJs准备整个FunSee所需要的环境变量， 并放置于global中。
 *
 * @param    void
 * @returns  void
 *
 * @date     2018-02-17
 * @author   yanzhenggang<robinyzg@hotmail.com>
 */
const initGlobalVariable = () => {
  // 存放实际项目的根目录, 如果项目启动命令没在根目录跑， 那十有八九Funsee会挂
  global.__ROOT_PATH__ = process.cwd();

  // 实际项目中FunSee的文件夹位置
  const funseeFolder = rd.readDirFilterSync(process.cwd(), /(\/funsee)$/);
  global.__FS_PATH__ = funseeFolder[0];

  // 存放node_env, 由于公司内docker镜像是通过DEPLOY_ENV来判断环境， 所以预设NODE_ENV
  if (process.env.DEPLOY_ENV) { process.env.NODE_ENV = process.env.DEPLOY_ENV === 'prd' ? 'production' : process.env.DEPLOY_ENV; }
  process.env.NODE_ENV = process.env.NODE_ENV || 'uat'; // 如果DEPLOY_ENV为空则默认为开发环境
  global.__NODE_ENV__ = process.env.NODE_ENV;

  console.log('FunSee Hammer: initialize global varible done');
};

module.exports = {
  initGlobalVariable
};
