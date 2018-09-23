require('dotenv').config();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const hbs = require('hbs')

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

//mongoose.connect('mongodb://localhost:27017/tumblr-lab-development');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/passport-local', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });
	  

const app = express();

// Express View engine setup
app.use(require('node-sass-middleware')({
	src:  path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	sourceMap: true
}));

hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
	secret: 'our-passport-local-strategy-app',
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({
		mongooseConnection: mongoose.connection
	})
}))

require('./passport/index')(app);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	res.locals.title = "IronTumblr";
	res.locals.user = req.user;

	next();
});

// ROUTES
app.use('/', require('./routes/index'));
app.use('/', require('./routes/authentication'));

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