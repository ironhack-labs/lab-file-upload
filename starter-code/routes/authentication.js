const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/User')
const multer = require ('multer')
const uploads = multer({dest:'public/uploads'})


router.get('/login',(req, res, next)=>{
    res.render('authentication/login')
  })
  
  router.post('/login',passport.authenticate('local'),(req, res, next)=>{
    res.redirect('authentication/profile')
  })

router.get('/signup',(req, res, next)=>{
    res.render('authentication/signup')
  })

  router.post('/signup',uploads.single('image'),(req, res, next)=>{
    if(req.file)req.body['photoURL'] = `uploads/${req.file.filename}`
    User.register(req.body,req.body.password)
      .then(user=>{
        res.redirect('authentication/login')
      }).catch(e=>console.log(e))
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


