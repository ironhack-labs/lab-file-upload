

module.exports.show = (req, res, next) => {
  res.render('user/profile', {
      user : req.user
  });
};
