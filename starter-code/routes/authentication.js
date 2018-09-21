const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const multer     = require('multer')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploads    = multer({dest:'public/uploads'})


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

router.post('/signup', uploads.single('image'), ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}),(req, res, next)=>{
    if(req.file)req.body['photoURL'] = `uploads/${req.file.filename}`
    user.create(req.body)
    .then(user=>{
        res.redirect('/authentication/login')
      })
    .catch(e=>next(e))
});

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
