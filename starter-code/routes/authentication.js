const express    = require('express');
const passport   = require('passport');
const multer     = require('multer');
const bcrypt     = require('bcrypt');
const session    = require('express-session');
const flash      = require('connect-flash');
const upload     = multer({ dest: './public/uploads/' });
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User       = require('../models/user');
const Picture    = require("../models/picture");

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));
///////////////////////////////////////////////////////
router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post("/signup", upload.single('file'), (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  if (username === "" || password === "") {
  	req.flash('error', 'Indicate username and password' );
    res.render("authentication/signup", { "message": req.flash("error") });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
    	req.flash('error', 'The username already exists' );
      res.render("authentication/signup", { message: req.flash("error") });
      return;
    }

    const userInfo = {
      username,
      email,
      password
    } = req.body;
    const pictureInfo = {
      name: req.file.originalname,
      pic_path: `/uploads/${req.file.filename}`,
      pic_name: req.body.pic_name
    };
    const hashPass = bcrypt.hashSync(userInfo.password, bcrypt.genSaltSync(10), null);
    const newPicture = new Picture ({
      pic_path: pictureInfo.pic_path,
      pic_name: pictureInfo.pic_name
    });

    const newUser = new User({
      username: userInfo.username,
      email: userInfo.email,
      password: hashPass,
      img: newPicture
    });

    newUser.save((err) => {
      if (err) {
      	req.flash('error', 'The username already exists' );
        res.render("authentication/signup", { message: req.flash('error') });
      } else {
        passport.authenticate("local")(req, res, function () {
           res.redirect('index');
        });
      }
    });
  });
});


//////////////////////////////////////////////////////7
router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
