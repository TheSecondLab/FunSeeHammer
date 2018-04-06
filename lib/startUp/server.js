const app = require(`${process.cwd()}/dist/server.js`);

app().startup();
console.log('server started. Enjoy!');