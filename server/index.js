const chalk = require("chalk");
const express = require("express");
const debug = require("debug")("app:serverUtils");
const morgan = require("morgan");

const app = express();

const startServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellowBright(`Server up at http://localhost:${port}`));
      resolve();
    });

    server.on("error", (error) => {
      reject(error);
    });
  });

app.use(morgan("dev"));

module.exports = startServer;
