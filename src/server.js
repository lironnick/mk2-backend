require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const chalk = require('chalk');
require('./database');
const extractJwtMiddleware = require('./middlewares/extract-jwt.middleware')
const { server } = require('./schema');

const opts = {
  port: process.env.PORT || 4000,
  cors: {
    credentials: true,
    origin: "*"
  },
  // tracing: true
};

server.express.use(extractJwtMiddleware);

server.start(opts, () => {    
  console.log(chalk.greenBright(`#####################################################################\n`));
  console.log(chalk.cyan(`ABC DA CONSTRUÇÃO \n`));
  console.log(chalk.cyan('\\{^_^}/ OI! \n'));
  console.log(chalk.cyan(`Server is running app Gra listening on port ${opts.port}! \n`));
  console.log(chalk.greenBright(`#####################################################################\n`));
});