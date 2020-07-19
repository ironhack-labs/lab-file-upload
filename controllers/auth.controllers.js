const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const mongoose = require('mongoose');

const routeGuard = require('../configs/route-guard.config');
const PostModel = require('../models/Post.model');

module.exports.displaySignupForm = (req, res) => res.render('auth/signup');

module.exports.checkInputsAndCreateNewUser = (req, res, next) => {
    const { username, email, password } = req.body;
    const image = req.file.filename;
  
    if (!username || !email || !password || !image) {
      res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email, image and password.' });
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
        return User.create({
          username,
          email,
          image,
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
      });
};

module.exports.displayLoginForm = (req, res) => res.render('auth/login');

module.exports.loginUser = (req, res, next) => {
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
            res.locals.currentUser = user;
            res.redirect('/userProfile');
        } else {
            res.render('auth/login', { errorMessage: 'Incorrect password.' });
        }
      })
      .catch(error => next(error));
};

module.exports.loggingOutUser = (req, res) => {
    req.session.currentUser = '';
    res.redirect('/');
};

module.exports.showUserProfile = (req, res) => {
    res.render('users/user-profile');
}

module.exports.checkPostInputAndCreateNewPost = (req, res) => {

    const picture = req.file.filename ? req.file.filename : '';
    const newPost = {
        content: req.body.content,
        creatorId: req.currentUser,
        picPath: picture,
        picName: req.body.picName,
    }
    //postParams.picPath = req.file.filename;
    console.log(newPost);
    //console.log('currentUser: ', currentUser);
    
    /* if (!postParams.content || !postParams.picPath || !postParams.picName) {
        res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide a text, image and image name.' });
        return;
    }

    const post = new PostModel(postParams);
    post.save()
        .then(() => res.redirect('posts'))
        .catch(err => console.log(err)); */
}

module.exports.displayPostForm = (req, res) => {
    res.render('posts/post-form');
}