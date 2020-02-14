const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

passport.serializeUser((user, callback) => callback(null, user._id));

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => callback(null, user))
    .catch(error => callback(error));
});

passport.use(
  'local-login',
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email',
      // passwordField: 'password',
    },
    (req, email, password, next) => {
      let user;
      User.findOne({ email })
        .then(doc => {
          user = doc;
          console.log('user in login: ', user);
          // here we will get either null (if username doesn't exist) or user object

          // if we get null
          if (!user) next(null, false, { message: 'Incorrect email' });

          // if we get user object
          return bcrypt.compare(password, user.password);
        })
        .then(isPasswordCorrect => {
          isPasswordCorrect
            ? next(null, user)
            : next(null, false, { message: 'Incorrect password' });
        })
        .catch(error => next(error));
    }
  )
);

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, next) => {
      const { firstName, lastName, email } = req.body;
      User.findOne({ email })
        .then(foundUser => {
          if (foundUser) {
            next(null, false, { message: 'This email already registered' });
            return;
          }
          bcrypt
            .hash(password, 10)
            .then(hash => {
              return User.create({
                username,
                firstName,
                lastName,
                email,
                password: hash,
              });
            })
            .then(user => next(null, user))
            .catch(err => next(err));
        })
        .catch(err => next(err));
    }
  )
);

module.exports = app => {
  app.use(
    session({
      secret: 'tumblrlabdev',
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
