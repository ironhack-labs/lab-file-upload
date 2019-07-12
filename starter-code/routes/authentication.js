const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const User = require('../models/user');
const upload = multer({ dest: './public/uploads/' });


router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error') });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/signup', (req, res) => {
    res.render('authentication/signup', { message: req.flash('error') });
});

router.post('/signup',
    upload.single('imgPath'),
    passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }),
);


//     name: req.body.name,
//         path: `/uploads/${req.file.filename}`,
//         originalName: req.file.originalname
//     });

//     pic.save((err) => {
//         res.redirect('/');
//     });







// }));

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
