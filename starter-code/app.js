require('dotenv').config();

const express            = require('express');
const path               = require('path');
const logger             = require('morgan');
const cookieParser       = require('cookie-parser');
const bodyParser         = require('body-parser');
const mongoose           = require('mongoose');
const hbs                = require('hbs')
const passport           = require('./handlers/passport')
const session            = require('express-session')


mongoose.connect('mongodb://localhost:27017/tumblr-lab-development');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(session({
  secret: process.env.SECRET, 
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*60*24 }
}))

app.use(passport.initialize())
app.use(passport.session())


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



const index = require('./routes/index');
const auth = require('./routes/auth')
app.use('/', auth)
app.use('/', index);



module.exports = app;
