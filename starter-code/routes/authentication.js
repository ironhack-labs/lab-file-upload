const express    = require('express');

const passport   = require('passport');

const multer = require('multer');

const Picture = require('../models/Picture');

const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


// router.get('/post', ensureLogin.ensureLoggedIn(), (req, res) => {
//     res.render('passport/private', { user: req.user });
//   });

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

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect: '/upload',
  failureRedirect: '/signup',
  failureFlash: true
}));

//

router.get('/upload', (req, res) => {
  res.render('picture', { message: req.flash('error') });
});

const upload = multer({ dest: './public/uploads/' });

// middleware upload.single('photo'), (req, res)
router.post('/upload', upload.single('photo'), (req, res) => {

  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save((err) => {
    res.redirect('/');
  });
});
//

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
