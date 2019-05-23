const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const cloudinaryConfig = require('../config/cloudinary.config')
const user = require('../models/user')
const Post = require('../models/post')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/userHome',
  failureRedirect : '/login',
  failureFlash : true
}));



router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', [ensureLoggedOut(),cloudinaryConfig.single('photo')], passport.authenticate('local-signup', {
    successRedirect : '/userHome',
    failureRedirect : '/signup',
    failureFlash : true
  }));


router.get('/userHome',ensureLoggedIn(), (req, res)  => {
    Post.find()
    .then (posts => res.render('userPrivate/userHome', { posts, user: req.user}))
    .catch(error => console.log(error))
})

router.post('/userHome', cloudinaryConfig.single('photo'), (req, res, next) => {
    
    const content = req.body.text
    const picPath= req.file.url
    const picName= req.file.originalname

    const newpost = new Post({content, picPath, picName})

    newpost.save()

    .then(thePost => res.redirect('/'))
    .catch(error => console.log(error))
})
 

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/')
})





module.exports = router;
