const express            = require('express');
const path               = require('path');
const favicon            = require('serve-favicon');
const logger             = require('morgan');
const cookieParser       = require('cookie-parser');
const bodyParser         = require('body-parser');
const expressLayouts     = require('express-ejs-layouts');
const passport           = require('passport');
const multer             = require('multer');
const LocalStrategy      = require('passport-local').Strategy;
const User               = require('./models/user');
const bcrypt             = require('bcrypt');
const session            = require('express-session');
const MongoStore         = require('connect-mongo')(session);
const mongoose           = require('mongoose');
const flash              = require('connect-flash');

// Load our ENVIRONMENT VARIABLES from the .env file in dev
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
app.use(expressLayouts);

app.use(session({
  secret: 'tumblrlabdev',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use('local-login', new LocalStrategy((username, password, next) => {
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
    if (typeof user === undefined){
      return next(null, false, {message: 'Please log in to comment posts'});
    }

    return next(null, user);
  });
}));

passport.use('local-signup', new LocalStrategy(
  { passReqToCallback: true },
  (req, username, password, next) => {
    // To avoid race conditions
    process.nextTick(() => {
        User.findOne(
          {'username': username},
          (err, user) => {
            if (err) {
              next(err);
              return;
            }
            if (user) {
                return next(err, {message: 'Username is taken'});
            } else {
                // Destructure the body
                const {
                  username,
                  email,
                  password,
                  photoAddress
                } = req.body;

                const photoUpload = req.file;
                console.log(photoUpload);

                console.log(req.body);
                const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                const newUser = new User({
                  username,
                  email,
                  password: hashPass,
                  photoAddress: `/uploads/${req.file.filename}`
                });

                newUser.save((err) => {
                    if (err) {
                        next(null,false);
                      }
                      req.flash('success', 'You have registered succesfully!');
                      return next(null, newUser);
                });
            }
        });
    });
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components/')))
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
});
// --------------------------------------------------
//  ALL THE ROUTES
const index = require('./routes/index');
const authRoutes = require('./routes/authentication');
const postRoutes = require('./routes/post-routes');
app.use('/', index);
app.use('/', authRoutes);
app.use('/',postRoutes);
// --------------------------------------------------
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
