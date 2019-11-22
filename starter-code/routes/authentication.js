const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer')
const uploadCloud = require('../configs/cloudinary.config');

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    console.log(process.env.CLOUDINARY_NAME)
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', [ensureLoggedOut(), uploadCloud.single('imgFile')], passport.authenticate('local-signup', {
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

router.get('/upload', (req, res, next) => {
    res.render('authentication/upload')
});
router.post('/upload', uploadCloud.single('imgFile'), (req, res, next) => {
    const path = req.file.url
    User.findByIdAndUpdate(req.user._id, {
            path
        })
        .then(us => res.redirect('/'))
        .catch(error => console.log(error))
});

module.exports = router;
