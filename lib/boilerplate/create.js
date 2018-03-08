const fs = require('fs');
const gitClone = require('git-clone');
const ora = require('ora');

module.exports = ({ projectName }) => {
  // ProjectName是必须传入的参数， 不然无法创建项目
  if (!projectName) {
    console.error('Please enter a <Project Name> follow by \'create\'\nLike: funsee-hammer create exampleApp');
    return;
  }

  // 在当前文件夹下不能存在于projectName同名的文件夹
  if (fs.existsSync(projectName)) {
    console.error(`${projectName} is already existed under ${process.cwd()}`);
    return;
  }

  // 添加loading旋转图
  const spinner = ora('Downloading FunSee Boilerplate from Github').start();
  spinner.color = 'yellow';

  gitClone('git@github.com:TheSecondLab/FunSeeBoilerplate.git', projectName, { clone: true }, (err) => {
    if (err) {
      spinner.fail();
      console.error(`Create ${projectName} failed, Please check below errors: \n${err}`);
      return;
    }
    spinner.succeed();
    console.log(`Create '${projectName}' successful! Enjoy!`);
  });
};
