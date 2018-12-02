const passport = require("passport");
require('./serializers');
require('./stategies/local');

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
}