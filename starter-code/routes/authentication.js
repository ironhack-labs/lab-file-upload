const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const multer = require('multer')
const upload = multer({
    dest: './public/uploads/'
})
const Post = require('../models/post')
const User = require('../models/user')

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', {
        message: req.flash('error')
    });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', {
        message: req.flash('error')
    });
});

router.post('/signup', ensureLoggedOut(), upload.single('pic'), (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === "" || password === "") {
      res.render("auth/signup", { message: "Indicate username and password" });
      return;
    }
  
    User.findOne({ username }, "username", (err, user) => {
      if (user !== null) {
        res.render("auth/signup", { message: "The username already exists" });
        return;
      }
  
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
  
      User.create({
        username,
        email: req.body.email,
        password: hashPass,
        picPath: `/uploads/${req.file.filename}`
      })
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      })
    });
  });

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user: req.user
    });
});

router.post('/new-post', ensureLoggedIn('/login'), upload.single('pic'), (req, res, next) => {
    Post.create({
        content: req.body.text,
        createId: req.user.username,
        picPath: `/uploads/${req.file.filename}`,
        picName: req.file.originalname
    })
    .then(() => res.redirect('/'))
    .catch(next)
});

router.post('/new-comment/', ensureLoggedIn('/login'), upload.single('pic'), (req, res, next) => {
    console.log(req.body, req.body.postid)
    let comment = {
        content: req.body.text,
        authorId: req.user.username,
        imagePath: `/uploads/${req.file.filename}`,
        imageName: req.file.originalname
    }
    Post.findOneAndUpdate({_id: req.body.postid}, { $push: { comments: comment } })
    .then(() => res.redirect('/'))
    .catch(next)
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;