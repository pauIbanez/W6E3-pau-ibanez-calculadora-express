const chalk = require("chalk");
const express = require("express");
const debug = require("debug")("app:serverUtils");
const morgan = require("morgan");
const { assesParams, params } = require("../utils/paramUtils");
const generalError = require("../errorHandles/errorHandlers");
const errorTypes = require("../errorHandles/errorTypes");

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

app.use((req, res, next) => {
  if (req.method !== "GET") {
    const error = new Error("Metod is not get");
    error.type = errorTypes.methodError;
    next(error);
  }
  next();
});

app.use(assesParams);

app.get("/sum", (req, res) => {
  calculate(params);
});
app.use(generalError);

module.exports = startServer;
