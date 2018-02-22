const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const multer  = require('multer');
const user = require('../models/user')
let upload = multer({ dest: '../public/uploads/' });


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
//me confunde aqui?
router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}),
  upload.single('photo'), (req,res) => {
      const image = new User ({ //no se si es verdad? hacer otro modelo dentro de user?
          name: req.body.name,
          path:`/uploads/${req.file.filename}`,
          originalName: req.file.originalname
      });
      image.save((err)=>{
          res.redirect('/');
      });  
  }
);
router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
