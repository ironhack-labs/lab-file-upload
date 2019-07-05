const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/user')
const multer = require('multer')
const upload = multer({dest: './public/uploads'})

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/profile',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', ensureLoggedIn('/login'), async (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.post('/profile', ensureLoggedIn('/login'), upload.single('photo'), async (req, res) => {
    const {id} = req.user
    await User.findOneAndUpdate(id, {
        profilePicture: `/uploads/${req.file.filename}`,
        originalName: req.file.originalname
    })
    res.redirect('/profile')
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
