const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const User       = require('../models/User')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post("/signup", (req, res, next) => {
    User.register(req.body, req.body.password)
        .then(user => {
            const name = user.name
            res.redirect('/login',name);
        })
        .catch(e => next(e));
});

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
    const email = req.user.email;
    req.app.locals.user = req.user;
    res.send("Tu eres un usuario real con email: " + email);
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
