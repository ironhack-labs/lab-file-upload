// routes/auth.routes.js

const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const Post = require('../models/Post.model');
const mongoose = require('mongoose');
const multer = require('multer')
const uploads = multer({dest: './public/uploads'})

const routeGuard = require('../configs/route-guard.config');

////////////////////////////////////////////////////////////////////////
///////////////////////////// SIGNUP //////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .get() route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));

// .post() route ==> to process form data
router.post('/signup', uploads.single('avatar'), (req, res, next) => {
  const userData = req.body
  userData.avatar = req.file ? `/uploads/${req.file.filename}` : undefined
  const user = new User(userData)
  console.log(user)

  if (!user.username || !user.email || !user.password) {
    res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
    return;
  }

  // make sure passwords are strong:
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(user.password)) {
    res
      .status(500)
      .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(user.password, salt))
    .then(hashedPassword => {
      user.password = hashedPassword
      user.save();
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      res.redirect('/userProfile');
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
    }); // close .catch()
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
      } else if (bcryptjs.compareSync(password, user.password)) {
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

router.get('/post-form', routeGuard, (req, res) => res.render('post/post-form'))

router.post('/post-form',  routeGuard,  uploads.single('picPath'), (req, res) => {
  
  const postData = req.body
  postData.creatorId = req.session.currentUser._id
  postData.picPath = req.file ? `/uploads/${req.file.filename}` : undefined
  const post = new Post(postData)

  post.save()
    .then(() => res.redirect('posts'))
    .catch(err => console.log(err))
})

router.get('/posts', (req, res, next) => {
  Post.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .populate('creatorId')
      .then(posts => {
        res.render("postslist", {
          posts,
        })
      })
      .catch(next);
    
})


router.get('/posts/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      res.render("postdetails", post)
    })
    .catch(next);
    
})

module.exports = router;
