const chalk = require("chalk");
const debug = require("debug")("app:errorHandler");

const errorTypes = require("./errorTypes");

// eslint-disable-next-line no-unused-vars
const generalError = (err, req, res, next) => {
  debug(chalk.redBright(err.message));

  switch (err.type) {
    case errorTypes.methodError:
      res.status(403);
      res.json({
        error: true,
        message: err.message,
      });
      break;

    case errorTypes.paramsError:
      res.status(400);
      res.json({
        error: true,
        message: err.message,
      });
      break;
    default:
      res.status(500).send("Internal Server Error");
  }
};
module.exports = generalError;
