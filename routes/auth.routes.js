// routes/auth.routes.js

const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const Post = require('../models/Post.model');
const Comment = require('../models/Comments.model');
const mongoose = require('mongoose');

const multer = require('multer');
const uploads = multer({ dest: './public/uploads' });

const routeGuard = require('../configs/route-guard.config');

////////////////////////////////////////////////////////////////////////
///////////////////////////// SIGNUP //////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .get() route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup', { title: 'Register here' }));

// .post() route ==> to process form data
router.post('/signup', uploads.single('avatar'), (req, res, next) => {
  const { username, email, avatar, password } = req.body;

  if (!username || !email || !password) {
    res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email, avatar and password.' });
    return;
  }

  // make sure passwords are strong:
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(500)
      .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      const userParams = req.body;
      userParams.avatar = req.file ? `/uploads/${req.file.filename}` : undefined;
      // const user = new User(userParams);
      return User.create({
        // username: username
        username,
        email,
        avatar: userParams.avatar,
        passwordHash: hashedPassword
      });
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
router.get('/login', (req, res) => res.render('auth/login', { title: 'Log in here' }));

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
        res.redirect(`/userProfile/${user._id}`);
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

router.get('/userProfile/:id', routeGuard, (req, res) => {
  res.render('users/user-profile');
});

router.post('/userProfile/:id', uploads.single('picPath'), routeGuard, (req, res, next) => {
  req.body.picPath = req.file ? `/uploads/${req.file.filename}` : undefined;
  const id = req.params.id;

  return Post.create({
    // username: username
    content: req.body.content,
    creatorId: id,
    picName: req.body.picName,
    picPath: req.body.picPath
  })
    .then(() => {
      res.redirect(`/userProfile/${id}`);
    })
    .catch(error => next(error));
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// COMMENTS /////////////////////////////////
////////////////////////////////////////////////////////////////////////

router.get('/comments/:id', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Post.findById(id)
    .populate('creatorId')
    .populate('comments')
    .populate({
      path: 'comments',
      populate: {
        path: 'authorId',
        model: 'User'
      }
    })
    .then(post => {
      // res.json(post)
      // res.json(post.comments)
      res.render('users/comments', { post });
    })
    .catch(error => next(error));
});

router.post('/comments/:id', uploads.single('imagePath'), routeGuard, (req, res, next) => {
  req.body.imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
  const user = req.session.currentUser;
  const id = req.params.id;

  Comment.create({
    content: req.body.content,
    authorId: user._id,
    postId: req.params.id,
    imagePath: req.body.imagePath,
    imageName: req.body.imageName
  });

  Post.findById(id)
    .populate('creatorId')
    .populate('comments')
    .populate({
      path: 'comments',
      populate: {
        path: 'authorId',
        model: 'User'
      }
    })
    .then(post => {
      res.render('users/comments', { post });
    })
    .catch(error => next(error));
});

module.exports = router;
