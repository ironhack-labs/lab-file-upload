module.exports = (req, res, next) => {
  res.locals.user = req.user;
  res.locals.savedPic = req.savedPic;
  next();
};
