const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const User               = require('../models/user');


router.get('/login', ensureLoggedOut('/'), (req, res) => {
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

const myUploader = multer({
  dest: path.join(__dirname, '../public/uploads')
});
router.post('/signup', ensureLoggedOut(), myUploader.single('userPhoto'), (req, res, next) => {

    const username = req.body.username,
        password = req.body.password;

    if (!password && !username) {
        res.render('authentication/signup', {
            message: 'PLease Fill in the the require fields'
        });
        return;
    }
    User.findOne({
        'username': username
    }, (err, user) => {
        if (err) {
            return next(err);
        }

        if (user) {
            res.render('authentication/signup', {
                message: 'PLease pick another username yours is already in use'
            });
            return;
        } else {
            // Destructure the body

            const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            const newUser = new User({
                username: username,
                email: req.body.email,
                password: hashPass,
                photo: `/uploads/${req.file.filename}`

            });

            newUser.save((err) => {
                if (err) {
                    next(err);
                    return;
                }
                req.flash('success','yay');
                res.redirect('/');
                return;
            });
        }

    });
});
router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user: req.user
    });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;
