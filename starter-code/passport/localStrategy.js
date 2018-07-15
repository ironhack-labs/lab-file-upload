const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");

passport.use("local-login", new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }

      return next(null, user);
    });
  })
);

passport.use("local-signup", new LocalStrategy({ passReqToCallback: true },
    (req, username, password, next) => {
      // To avoid race conditions
      process.nextTick(() => {
        User.findOne({username})
        .then(user => {
          if (user) {
            throw new Error("Username already exists.");
          }

          const { email } = req.body;
          const hashPass = bcrypt.hashSync(
            password,
            bcrypt.genSaltSync(8),
            null
          );
          const newUser = new User({
            username,
            email,
            password: hashPass,
            profilePic: req.file ? req.file.filename : ""
          });

          return newUser.save();
        })
        .then(user => {
          return next(null, user);
        })
        .catch(err => {
          return next(err);
        });
      });
    }
  )
);
