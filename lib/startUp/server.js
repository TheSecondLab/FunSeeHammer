const { initGlobalVariable } = require('../tool/initial');

initGlobalVariable();

const app = require(`${process.cwd()}/dist/server.js`);

app().startup();
