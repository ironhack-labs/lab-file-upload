exports.isLogged = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  }

  next();
};
