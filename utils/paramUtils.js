const errorTypes = require("../errorHandles/errorTypes");

const assesParams = async (req, res, next) => {
  const recievedParams = req.query;

  const params = [];

  Object.values(recievedParams).forEach((recievedParam) => {
    const transformedParam = parseInt(recievedParam, 10);

    if (!Number.isNaN(transformedParam)) {
      params.push(transformedParam);
    }
  });

  if (params.length !== 2) {
    const error = new Error("Invalid params");
    error.type = errorTypes.paramsError;
    next(error);
    return;
  }

  req.numbers = params;
  next();
};

module.exports = {
  assesParams,
};
