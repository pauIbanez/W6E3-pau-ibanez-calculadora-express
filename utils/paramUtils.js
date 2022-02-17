const assesParams = (req, res, next) => {
  const url = new URL(`http://localhost${req.url}`);
  const params = url.searchParams;

  next();
};

module.exports = assesParams;
