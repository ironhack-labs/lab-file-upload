const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
//const multer = require ('multer')
const User = require ("../models/user")
const bcrypt=require("bcrypt")
const salt = bcrypt.genSaltSync(10)
const cloudinary = require ('../options/cloudinary.js')

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

router.post("/signup",cloudinary.single('photo'), (req,res,next)=>{
    const myUser=new User({
        username: req.body.username,
        email:    req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        photoPath:req.file.secure_url
    })
    myUser.save()
    .then(payload=>{
        console.log("User waas saved succesfully",payload)
        res.redirect("/")
        })
        .catch(err=>console.log("An error happened:",err))
})

// router.post('/signup',
// [ensureLoggedOut(), ],
// passport.authenticate('local-signup'(req,res,next), {
//     const User=new User({
//         username: req.body.username,
//         email:    req.body.email,
//         password: String,
//         photoPath:String
//     })
//   successRedirect : '/',
//   failureRedirect : '/signup',
//   failureFlash : true
// }));

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
