const express    = require('express');
const multer     = require('multer');
const uploadCloud= require('../config/cloudinary.js');
const User       = require('../models/user');
const bcrypt             = require('bcrypt');

const passport   = require('passport');
const router     = express.Router();
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

// router.post('/signup', upload.single('profile'), (req, res, next) => {
//     const {username} = req.body;
//     console.log(req.file);
//     res.send('sign');
    // User.findOne({
    //     'username': username
    // }, (err, user) => {
    //     if (err){ return next(err); }

    //     if (user) {
    //         return next(null, false);
    //     } else {
    //         // Destructure the body
    //         const {
    //           username,
    //           email,
    //           password
    //         } = req.body;
    //         const hashPass = password;
    //         // const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    //         const newUser = new User({
    //           username,
    //           email,
    //           password: hashPass,
    //           imgPath: req.file.url
    //         });

    //         newUser.save((err) => {
    //             if (err){ next(null, false, { message: newUser.errors }) }
    //             return next(null, newUser);
    //         });
    //     }
    // });
// });

router.post('/signup', ensureLoggedOut(), uploadCloud.single('profile'), passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true
}));

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
