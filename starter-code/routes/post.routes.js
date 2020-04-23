const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });



router.get('/', (req, res) => res.render('post/post'))

router.post(
    '/post',
    ensureLoggedIn(),
    upload.single('img'),
    passport.authenticate('local-signup', {
        successRedirect: '/index',
        failureRedirect: '/post',
        failureFlash: true
    })
);




module.exports = router;
