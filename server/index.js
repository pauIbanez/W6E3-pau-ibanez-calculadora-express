const chalk = require("chalk");
const express = require("express");
const debug = require("debug")("app:serverUtils");
const morgan = require("morgan");
const { assesParams } = require("../utils/paramUtils");
const {
  generalError,
  resourceNotFound,
} = require("../errorHandles/errorHandlers");
const errorTypes = require("../errorHandles/errorTypes");
const calculate = require("../utils/calculate");

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

app.get("/sum", assesParams, (req, res) => {
  const result = calculate(req.numbers[0], req.numbers[1], 1);
  res.json({
    operation: "sum",
    result,
  });
});

app.get("/substraction", assesParams, (req, res) => {
  const result = calculate(req.numbers[0], req.numbers[1], 2);
  res.json({
    operation: "substraction",
    result,
  });
});

app.get("/multiply", assesParams, (req, res) => {
  const result = calculate(req.numbers[0], req.numbers[1], 3);
  res.json({
    operation: "multiply",
    result,
  });
});

app.get("/division", assesParams, (req, res) => {
  const result = calculate(req.numbers[0], req.numbers[1], 4);
  res.json({
    operation: "division",
    result,
  });
});

app.use(resourceNotFound);

app.use(generalError);

module.exports = startServer;
