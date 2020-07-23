const User = require('../models/User.model');
const Comment = require('../models/Comment.model');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const mongoose = require('mongoose');

const routeGuard = require('../configs/route-guard.config');
const Post = require('../models/Post.model');

module.exports.displaySignupForm = (req, res) => res.render('auth/signup');

module.exports.checkInputsAndCreateNewUser = (req, res, next) => {
    const { username, email, password } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
  
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
            req.session.currentUser = user;
            console.log(user);
            console.log(req.session.currentUser);
            res.redirect('/userProfile');
        } else {
            res.render('auth/login', { errorMessage: 'User not found.' });
        }
      })
      .catch(error => next(error));
};

module.exports.loggingOutUser = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

module.exports.showUserProfile = (req, res) => {
    const user = req.session.currentUser;

    Post.find({creatorId: user._id})
        .then(posts => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Please log in.' });
            } else {
                res.render('users/user-profile', { user, posts });
            }
        })
        .catch(err => next(err))

    
}

module.exports.checkPostInputAndCreateNewPost = (req, res) => {

    const picture = req.file ? `/uploads/${req.file.filename}` : undefined;
    const newPost = {
        content: req.body.content,
        creatorId: req.session.currentUser._id,
        picPath: picture,
        picName: req.body.picName,
    }

    console.log(newPost);
    
    if (!newPost.content) {
        res.render('posts/post-form', { errorMessage: 'Text missing.' });
        return;
    }

    const post = new Post(newPost);
    post.save()
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
}

module.exports.displayPostForm = (req, res) => {
    const user = req.session.currentUser;
    if (!user) {
        res.render('auth/login', { errorMessage: 'Please log in.' });
    } else {
        res.render('posts/post-form');
    }
}

module.exports.viewPostDetails = (req, res) => {
    const {postId } = req.params;
    
    Post.findById(postId)
        .populate('creatorId')
        .populate({
            path: 'comments',
            populate: { path: 'authorId' }
        })
        .then(post => {
            res.render('posts/post-details', { post })
        })
        .catch(err => console.log(err))
}

module.exports.createPostComment = (req, res) => {
    const { postId } = req.params;
    const picture = req.file ? `/uploads/${req.file.filename}` : undefined;
    const { imageName } = req.body;
    const commentAuthor = req.session.currentUser._id;
    const commentText = req.body.comment;

    const comment = new Comment({
        content: commentText,
        postId: postId,
        authorId: commentAuthor,
        imagePath: picture,
        imageName: imageName
    })

    comment.save()
        .then(c => res.redirect(`/post/${postId}`))
        .catch(e => console.log(e));
}

