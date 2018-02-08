const express            = require('express');
const path               = require('path');
const favicon            = require('serve-favicon');
const logger             = require('morgan');
const cookieParser       = require('cookie-parser');
const bodyParser         = require('body-parser');
const expressLayouts     = require('express-ejs-layouts');
const passport           = require('passport');
const LocalStrategy      = require('passport-local').Strategy;
const User               = require('./models/user');
const bcrypt             = require('bcrypt');
const session            = require('express-session');
const MongoStore         = require('connect-mongo')(session);
const mongoose           = require('mongoose');
const flash              = require('connect-flash');

//Connect Mongo
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/tumblr-lab-development', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

const app = express();
//Routes
const index             = require('./routes/index');
const configurePassport = require('./helpers/passport');
const authRoutes        = require('./routes/authentication');

//Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
app.use(expressLayouts);

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

configurePassport();
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Make passport user available for templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/', index);
app.use('/', authRoutes);

// -- 404 and error handler

// NOTE: requires a views/not-found.ejs template
app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;
