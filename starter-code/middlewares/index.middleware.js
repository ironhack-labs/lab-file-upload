exports.checkUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.app.locals.logged = true;
  } else {
    req.app.locals.logged = false;
  }
  return next();
};
//route checking if the user is logged go to the next part it not redirect to home

exports.isAuth = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect("/");
};