const passport = require('passport')
const User = require('../models/User')


passport.use(User.createStrategy())

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport