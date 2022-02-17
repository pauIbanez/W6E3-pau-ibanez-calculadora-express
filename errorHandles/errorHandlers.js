const chalk = require("chalk");
const debug = require("debug")("app:errorHandler");

const errorTypes = require("./errorTypes");

const resourceNotFound = (req, res) => {
  res.status(404);
  res.json({
    error: true,
    message: "Resource not found",
  });
};

// eslint-disable-next-line no-unused-vars
const generalError = (err, req, res, next) => {
  debug(chalk.redBright(err.message));

  const generateErrorObject = (errorMessage) => ({
    error: true,
    message: errorMessage,
  });

  switch (err.type) {
    case errorTypes.methodError:
      res.status(403);
      res.json(generateErrorObject(err.message));
      break;

    case errorTypes.paramsError:
      res.status(400);
      res.json(generateErrorObject(err.message));
      break;
    default:
      res.status(500);
      res.json(generateErrorObject("Internal Server Error"));
  }
};
module.exports = { generalError, resourceNotFound };
