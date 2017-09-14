const express            = require('express');
const path               = require('path');
const logger             = require('morgan');
const cookieParser       = require('cookie-parser');
const bodyParser         = require('body-parser');
const expressLayouts     = require('express-ejs-layouts');
const session            = require('express-session');
const MongoStore         = require('connect-mongo')(session);
const mongoose           = require('mongoose');

module.exports = (app) => {

  app.set('views', path.join(__dirname, '../views'))
  app.set('view engine', 'ejs')
  app.use(expressLayouts)
  app.set("layout", "layouts/main-layout");


  app.use(session({
    secret: 'tumblrlabdev',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore( { mongooseConnection: mongoose.connection })
  }))

  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, '../public')))


  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use('/bower_components', express.static(path.join(__dirname, 'bower_components/')))
  app.use(express.static(path.join(__dirname, 'public')));


}
