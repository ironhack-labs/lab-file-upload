const express = require('express');
 const path = require('path');
 const favicon = require('serve-favicon');
 const logger = require('morgan');
 const cookieParser = require('cookie-parser');
 const bodyParser = require('body-parser');
 const passport = require('passport');
 const LocalStrategy = require('passport-local').Strategy;
 const User = require('./models/User');
 const bcrypt = require('bcrypt');
 const session = require('express-session');
 const MongoStore = require('connect-mongo')(session);
 const mongoose = require('mongoose');
 const flash = require('connect-flash');
 const hbs = require('hbs')

 //DB
 mongoose.connect('mongodb://localhost:27017/doctors');

 const app = express();
 
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'hbs');
 
 app.use(session({
   secret: 'doctors',
   resave: false,
   saveUninitialized: true,
   store: new MongoStore( { mongooseConnection: mongoose.connection })
 }))
 

 //passport
 passport.serializeUser((user, cb) => {
   cb(null, user.id);
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
 
     return next(null, user);
   });
 }));

 passport.use('local-signup', new LocalStrategy(
   { passReqToCallback: true },
   (req, username, p, next) => {
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
                   password,
                 } = req.body;
                 //const path = `/uploads/${req.file.filename}`;
                 //const {originalname} = req.file
                 const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                 const newUser = new User({
                   username,
                   email,
                   password: hashPass,
                   //profilePicture:{path, originalname}
                 });

                 newUser.save((err) => {
                     if (err){ next(null, false, { message: newUser.errors }) }
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
 app.use(express.static(path.join(__dirname, 'public')));




 const index = require('./routes/index');
 const authRoutes = require('./routes/authentication');
 const post = require('./routes/post');
 app.use('/', index);
 app.use('/', authRoutes);
 app.use('/', post);

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