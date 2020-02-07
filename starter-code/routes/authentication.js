const router    = require('express').Router();
const passport   = require('../config/passport');
const upload = require('../config/cloudinary')
const User = require('../models/user')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local', {
  successRedirect : '/auth/profile',
  failureRedirect : '/auth/login',
  failureFlash : true
}));

router.get('/signup',  (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', upload.single('photo'), async (req, res, next) => {
    const {username, email, password } = req.body
    const { secure_url: photoURL} = req.file

    const userExists = await User.findOne({email})
    if( userExists ) return res.render('authentication/signup', {message: 'El usuario ya esta registrado'})

    await User.register( {username,email, photoURL}, password)
    res.redirect('/auth/login')
});

router.get('/profile', ensureLoggedIn('/auth/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.get('/logout', ensureLoggedIn('/auth/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
