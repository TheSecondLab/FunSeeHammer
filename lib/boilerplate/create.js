const gitClone = require('download-git-repo');

module.exports = ({ projectName }) => {
  gitClone('git@github.com:TheSecondLab/FunSeeBoilerplate.git', projectName, { clone: true }, (err) => {
    console.log('done')
    console.log('err', err)
  });
};
