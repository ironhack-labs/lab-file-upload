const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const User = require('../models/user');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

//multer config
const multer = require('multer');
const upload = multer({dest: './public/assets'})

//cloudinary
const uploadCloud = require('../helpers/cloudinary')

//for body req (gracias a Rafa)
const {body} = require('../helpers/body');

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

router.post('/signup', uploadCloud.single('photo'), body, ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}, (req,res,next)=>{
    req.body.photoURL = '/assets'+req.file.filename;
    User.register(req.body, req.body.password)
    .then(user=>{
        res.redirect('/login')
    })
    .catch(e=>next(e));
})
);

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