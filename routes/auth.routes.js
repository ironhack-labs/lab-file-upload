// routes/auth.routes.js

const {
  Router
} = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const Post = require('../models/Post.model');
const mongoose = require('mongoose');
const fileUploader = require('../configs/cloudinary')

const routeGuard = require('../configs/route-guard.config');
const {
  post
} = require('../app');

////////////////////////////////////////////////////////////////////////
///////////////////////////// SIGNUP //////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .get() route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));

// .post() route ==> to process form data
router.post('/signup', (req, res, next) => {
  const {
    username,
    email,
    password
  } = req.body;

  if (!username || !email || !password) {
    res.render('auth/signup', {
      errorMessage: 'All fields are mandatory. Please provide your username, email and password.'
    });
    return;
  }

  // make sure passwords are strong:
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(500)
      .render('auth/signup', {
        errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.'
      });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        // username: username
        username,
        email,
        // passwordHash => this is the key from the User model
        //     ^
        //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
        passwordHash: hashedPassword,
        profilePicturePath: 'data:image/jpeg;base64,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'
      });
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      res.redirect('/userProfile');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('auth/signup', {
          errorMessage: error.message
        });
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
  const {
    email,
    password
  } = req.body;

  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }

  User.findOne({
      email
    })
    .then(user => {
      if (!user) {
        res.render('auth/login', {
          errorMessage: 'Email is not registered. Try with other email.'
        });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user;
        res.redirect('/userProfile');
      } else {
        res.render('auth/login', {
          errorMessage: 'Incorrect password.'
        });
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

router.get('/userProfile', routeGuard, async (req, res) => {
  user = await User.findById(req.session.currentUser._id)
  console.log(user.profilePicturePath)
  res.render('users/user-profile', {user})
  
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// POST ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

router.get('/create-post', (req, res) => {
  res.render('users/create-post')
})

router.post('/create-post', fileUploader.single('image'), async (req, res) => {
  const {
    picName,
    content
  } = req.body
  console.log(picName)
  console.log(req.session.currentUser._id)
  console.log("req file" + req.file.path)
  await Post.create({
    content,
    creatorId: req.session.currentUser._id,
    picPath: req.file.path,
    picName
  })
  res.redirect('/display-posts')
})

router.get('/display-posts', async (req, res) => {
  const posts = await Post.find()
  res.render('users/display-posts', {
    posts
  })
})

router.get('/post-details/:id', async (req, res) => {
  const {
    id
  } = req.params
  const post = await Post.findById(id)
  res.render('users/post-details', post)
})

////////////////////////////////////////////////////////////////////////
///////////////////////////// EDIT for registered users ////////////////
////////////////////////////////////////////////////////////////////////

router.get('/edit/:id', routeGuard, async (req, res) => {
  const {
    id
  } = req.params
  const post = await Post.findById(id)
  console.log(post)
  res.render('users/edit-post', post);
});

router.post('/edit/:id', routeGuard, fileUploader.single('image'), async (req, res) => {
  const {
    id
  } = req.params
  const {
    picName,
    content
  } = req.body
  // console.log(req.body)
  // console.log("swag")
  console.log(id, picName, content)
  let picPath
  if (req.file) {
    picPath = req.file.path
  } else {
    picPath = req.body.existingImage
  }

  await Post.findByIdAndUpdate(id, {
    picName,
    content,
    picPath
  })
  res.redirect('/display-posts')
})

////////////////////////////////////////////////////////////////////////
///////////////////////////// PROFILE PICTURE ////////////////
////////////////////////////////////////////////////////////////////////

router.get('/edit-profile-picture', routeGuard, async (req, res ) => {
  user = await User.findById(req.session.currentUser._id)
  res.render('users/edit-profile-picture', {user})
})

router.post('/edit-profile-picture', routeGuard, fileUploader.single('image'), async (req, res) => {
  const id = req.session.currentUser._id
  console.log(req.file)
  console.log(id)
  let picPath
  if (req.file) {
    picPath = req.file.path
  } else {
    picPath = req.body.existingImage
  }

  await User.findByIdAndUpdate(id, {profilePicturePath: picPath})
  user = await User.findById(req.session.currentUser._id)

  res.render('users/user-profile',{user})
})

module.exports = router;