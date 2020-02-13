const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../configs/claudinary.config');
const Picture = require('../models/picture.model')

router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('authentication/login', { message: req.flash('error') });
});

router.post(
  '/login',
  ensureLoggedOut(),
  passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('authentication/signup', { message: req.flash('error') });
});

router.post(
  '/signup',
  ensureLoggedOut(),
  passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  })
);

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {

  res.render('authentication/profile', {
    user: req.user
  });
});
//---------------------------------------------------------

router.post('/profile', uploadCloud.single('phototoupload'), (req, res, next) => {

  req.user.picture = req.file.secure_url
  res.render('authentication/profile', {
    user: req.user
  });
})

router.get('/upload', (req, res) => res.render("upload"))
router.post('/upload', uploadCloud.single('phototoupload'), (req, res, next) => {

  Picture.create({
    description: req.body.description,
    path: req.file.secure_url,
    name: req.file.originalname,
    comments: []
  })
    .then(() => res.redirect('/gallery'))
    .catch(err => next(err))
})

router.get('/gallery', (req, res) => {
  Picture.find()
    .then(allPictures => res.render('gallery', { allPictures }))
    .catch(err => next(err))
})

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect('/');

});

router.get('/details/:id', (req, res) => {
  const id = req.params.id
  Picture.findById(id)
    .then(thePictures => res.render('details', thePictures))
    .catch(err => next(err))
})
router.post('/details/:id', (req, res, next) => {
  const id = req.params.id

  Picture.findById(id)
    .then(thepicture => {
      thepicture.comments.push(req.body.comments)
      console.log(thepicture)
      res.redirect(`/gallery`);

    })
    .catch(err => next(new Error(err)))

  // req.user.picture = req.file.secure_url
  // res.render('/details/:id');

})



module.exports = router;
