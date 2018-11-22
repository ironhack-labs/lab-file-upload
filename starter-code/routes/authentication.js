const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const User = require("../models/user");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../config/cloudinary.js');
const bcrypt = require("bcrypt");

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

router.post('/signup', uploadCloud.single('photo'), ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));
// , (req,res) => {
//     const { username, email, password } = req.body;
//               const imgPath = req.file.url;
//               const imgName = req.file.originalname;

//               const hashPass = bcrypt.hashSync(
//                 password,
//                 bcrypt.genSaltSync(8),
//                 null
//               );
//               const newUser = new User({
//                 username,
//                 email,
//                 password: hashPass,
//                 imgName,
//                 imgPath
//               });

//               newUser.save()
//               .then(()=>{console.log("Usuario guardado"); res.redirect("/login")})
//               .catch(err => console.log(err));
// });

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
