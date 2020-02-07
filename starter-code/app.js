require('dotenv').config()
const express            = require('express');
const path               = require('path');
const favicon            = require('serve-favicon');
const logger             = require('morgan');
const cookieParser       = require('cookie-parser');
const bodyParser         = require('body-parser');
const mongoose           = require('mongoose');

const passport           = require('./config/passport');
const session            = require('express-session');
const flash              = require('connect-flash');
const hbs                = require('hbs')

mongoose.connect(process.env.DB, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(db => console.log('Conected to ' + db.connections[0].name)).catch(err => console.log(err));

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const index = require('./routes/index');
const authRoutes = require('./routes/authentication');
app.use('/', index);
app.use('/auth', authRoutes);

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
