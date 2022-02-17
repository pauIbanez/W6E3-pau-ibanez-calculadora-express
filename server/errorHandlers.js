const chalk = require("chalk");
const debug = require("debug")("app:errorHandler");

// eslint-disable-next-line no-unused-vars
const generalError = (err, req, res, next) => {
  debug(chalk.redBright(err.message));

  if (err.methodError) {
    res.status(403);
    res.json({
      error: true,
      message: err.message,
    });
  } else {
    res.status(500).send("Internal Server Error");
  }
};
module.exports = generalError;
