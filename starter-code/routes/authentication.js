const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require("multer");
const upload = multer({ dest: './public/uploads/' });
const Post = require("../models/post.js")

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/user',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', ensureLoggedOut(), upload.single('photo'), passport.authenticate('local-signup', {
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

router.get('/new', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/new', {
        user: req.user
    });
});

router.post('/new',upload.single('photo'), (req, res, next) => {
    const {
        content
    } = req.body;
    const {
        originalname,
        path
    } = req.file;
    const id = req.user.id;
    new Post({
            content,
            id,
            photo: {
                originalname,
                path
              }
        })
        .save().then(post => {
            res.redirect("/")
        }).catch(err => {
            next(err)
        })

});

module.exports = router;
