const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const multer  = require('multer');
const Picture = require("../models/user")
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const mongoose = require('mongoose');
const upload = multer({ dest: './public/uploads/' });
const bcrypt = require('bcrypt');
const bcryptSalt = 10

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

//  router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
//    successRedirect : '/',
//    failureRedirect : '/signup',
//    failureFlash : true
//  }));



router.post('/signup', upload.single('photo'),(req,res,next)=>{

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(req.body.password, salt);
    

const pic = new Picture({
    username: req.body.username,
    email: req.body.email,
    password: hashPass,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });




  pic.save((err) => {
      res.redirect('/');
  });

 })


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
