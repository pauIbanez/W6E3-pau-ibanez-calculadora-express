require("dotenv").config();
const debug = require("debug")("app:root");

const chalk = require("chalk");
const startServer = require("./server");

const port = process.env.PORT || 4000;

const initialize = async () => {
  try {
    await startServer(port);
  } catch (error) {
    debug(chalk.redBright(error.message));
  }
};

initialize();
