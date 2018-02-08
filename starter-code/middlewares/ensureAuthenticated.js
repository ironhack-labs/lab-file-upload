const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("[Forbidden] User cannot access this page");
    res.redirect('/');
  }
}

module.exports = ensureAuthenticated;