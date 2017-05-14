// PASSPORT GOES THROUGH THIS
// 1. Our form
// 2. LocalStrategy callback
// 3. (if successful) passport.serializeUser()

const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy  = require('passport-local').Strategy;
// The same as:
// const passportLocal = require('passport-local');
// const LocalStrategy = passportLocal.Strategy;


const User = require('../models/user.js');

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      cb(err);
      return;
     }
    cb(null, user);
  });
});

passport.use('local-login', new LocalStrategy(
  (username, password, next) => {
  User.findOne(
    { username }, (err, user) => {
    if (err) {
      next(err);
      return;
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

passport.use('local-signup', new LocalStrategy(
  { passReqToCallback: true },
  (req, username, password, next) => {
    // To avoid race conditions
    process.nextTick(() => {
        User.findOne({
            'username': username
        }, (err, user) => {
            if (err){ return next(err); }

            if (user) {
                return next(null, false);
            } else {
                // Destructure the body
                const {
                  username,
                  email,
                  password
                } = req.body;
                const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                const newUser = new User({
                  username,
                  email,
                  password: hashPass
                });

                newUser.save((err) => {
                    if (err){ next(null, false, { message: newUser.errors });
                   }
                    return next(null, newUser);
                });
            }
        });
    });
}));
