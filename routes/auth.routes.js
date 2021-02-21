// routes/auth.routes.js

const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const Photo = require('../models/Photo.model');
const Post = require('../models/Post.model');
const mongoose = require('mongoose');

const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

const routeGuard = require('../configs/route-guard.config');

////////////////////////////////////////////////////////////////////////
///////////////////////////// SIGNUP //////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .get() route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));

// .post() route ==> to process form data
router.post('/signup', upload.single('photo'), (req, res, next) => {
    
  const { username, email, password } = req.body;
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if (!username || !email || !password) {
    res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
    return;

  } else if (!regex.test(password)) {
    res
      .status(500)
      .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    return;

  } else {
    const photo = new Photo({
      name: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname
    });

    photo
      .save()
      .then((p) => {

        bcryptjs
          .genSalt(saltRounds)
          .then(salt => bcryptjs.hash(password, salt))
          .then(hashedPassword => {
            return User.create({
              username,
              email,
              passwordHash: hashedPassword,
              photo: p.path,
            });
          })
          .then(userFromDB => {
            console.log('Newly created user is: ', userFromDB);
            res.render('auth/login', { okMessage: 'Account successfuly created. Now you can log-in.' });
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.status(500).render('auth/signup', { errorMessage: error.message });
            } else if (error.code === 11000) {
              res.status(500).render('auth/signup', {
                errorMessage: 'Username and email need to be unique. Either username or email is already used.'
              });
            } else {
              next(error);
            }
          });

          })
          .catch(err => {
            next(error);
          });
  }
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGIN ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .get() route ==> to display the login form to users
router.get('/login', (req, res) => res.render('auth/login'));

// .post() login route ==> to process form data
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user;
        res.redirect('/userProfile');
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGOUT ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/userProfile', routeGuard, (req, res) => {
  res.render('users/user-profile');
});


////////////////////////////////////////////////////////////////////////
//////////////////////////// PROFILE ///////////////////////////////////
////////////////////////////////////////////////////////////////////////

router.get('/profile', (req, res) => res.render('users/user-profile'));


////////////////////////////////////////////////////////////////////////
///////////////////////////// POSTS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

router.get('/create', (req, res) => res.render('auth/create'));

router.post('/create', upload.single('photo'), (req, res, next) => {
  
  console.log(req.body);

  const { content, creatorId, picName } = req.body;
  
    const photo = new Photo({
      name: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname
    });

    photo
      .save()
      .then((photo) => {
        Post.create({
          creatorId,
          content,
          picName,
          picPath: photo.path,
        })
        .then((post) => {
          res.redirect(`post/${post._id}`);
        })
      })
      .catch(err => {
        next(err);
      });
});

module.exports = router;
