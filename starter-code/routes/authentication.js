const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinary.js")
const salt = bcrypt.genSaltSync(10);

const multer = require("multer");

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', cloudinary.single('image'), (req,res,next) => {
    
    const user = new User({
        username: req.body.username,
        email:    req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        image: req.file.secure_url
    })
    user.save()
    .then(data => {
        res.redirect("/")
    })
    .catch(err => console.log(err))
});

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
