const errorTypes = require("../errorHandles/errorTypes");

let params;

const assesParams = (req, res, next) => {
  const url = new URL(`http://localhost${req.url}`);
  const recievedParams = [];

  url.searchParams.forEach((recievedParam) => {
    const transformedParam = parseInt(recievedParam, 10);

    if (!Number.isNaN(transformedParam)) {
      recievedParams.push(transformedParam);
    }
  });

  if (recievedParams.length !== 2) {
    const error = new Error("Invalid params");
    error.type = errorTypes.paramsError;
    next(error);
    return;
  }
  params = recievedParams;
  next();
};

module.exports = {
  assesParams,
  params,
};
