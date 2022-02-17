let params;

const assesParams = (req, res, next) => {
  const url = new URL(`http://localhost${req.url}`);
  const recievedParams = url.searchParams;
  params = recievedParams;
  next();
};

module.exports = {
  assesParams,
  params,
};
