const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const flash = require("connect-flash");

require('./configs/db.config');
require('./configs/passport.config').setup(passport);

const home = require('./routes/home.routes');
const auth = require('./routes/auth.routes');
const user = require('./routes/user.routes');
const post = require('./routes/post.routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'Super Secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60
  })
}));
app.use(passport.initialize());
app.use(passport.session());

//MIDDLEWARE PARA PASAR EL USER A UNA VARIABLE GLOBAL EN EL QUE TODAS LAS VIEWS PUEDEN ACEDER A EL
//<% if (session.email) { %>
app.use(function (req, res, next) {
  // PONES {} PORQUE ASI NO ES NECESARIO EN LA VISTA PONER TYPEOF NULL
  res.locals.session = req.user || {};
  next();
});

app.use('/', home);
app.use('/', auth);
app.use('/users', user);
app.use('/posts', post);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
