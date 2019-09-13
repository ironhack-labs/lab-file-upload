const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const upload = require('../config/cloudinary.js');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/login', (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup',(req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));


// router.post('/signup', upload.single('profileImage'), (req,res,next)=>{
//     Image.create({
//         url :req.image.url
//     })
//     .then(profilePic =>{
//         console.log(profilePic);
//         res.redirect('/');
//     })
//     .catch(error =>{
//         console.log('Error uploading', error);
//     })
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
