const chalk = require("chalk");
const express = require("express");
const debug = require("debug")("app:serverUtils");
const morgan = require("morgan");
const assesParams = require("../utils/paramUtils");
const generalError = require("./errorHandlers");

const app = express();
let params;

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

app.use((req, res, next) => {
  if (req.method !== "GET") {
    const error = new Error("Metod is not get");
    error.methodError = true;
    next(error);
  }
  next();
});

app.use(assesParams);

app.use(generalError);

module.exports = startServer;
