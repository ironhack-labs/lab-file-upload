const express = require('express');
const passport = require('passport');
const User = require('../models/user')
const debug = require('debug')
const bodyParser = require('body-parser');


const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('authentication/login', { message: req.flash('error') });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('authentication/signup', { message: req.flash('error') });
});

// router.post('/signup', ensureLoggedOut(), ((req, res) => {
//   debug
//   console.log('******************* RES EXIST :')
//   console.log(passport.authenticate.value())
//   const data = new Promise((req, res) => {
//     console.log(passport.authenticate('signup'))
//     passport.authenticate('signup')
//   })
//   console.log('******************* RES EXIST :', data)
//   data.resolve()
//     // }).then(log => {
//     //   console.log(log)
//     //   return log
//     // }))

//     // .then(res => {
//     //   console.log("WAITED FOR REGISTER")
//     //   res.redirect('/signup')
//     // })
//     .catch(err => console.log(err))
// }))

router.post('/signup', function(req, res, next) {
  passport.authenticate('signup', function(err, user, info) {
    if (err) {
      return res.json(500, {
        err: err,
        sessionId: req.session.id
      });
    }
    if (!user) {
      return res.json(400, {
        err: info,
        sessionId: req.session.id
      });
    }
    req.login(user, function(err) {
      if (err) {
        return res.json({
          err: 'Could not login user',
          sessionId: req.session.id
        });
      }
      res.json(201, {
        user: user,
        sessionId: req.session.id
      });
    });
  })(req, res, next);
});

//   {
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true
// }


// const promise = new Promise(
//   (req, res) => {
//     const result = passport.authenticate(req, res, next)
//     console.log(result.toString())
//     return result
//   })





router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
  res.render('authentication/profile', {
    user: req.user
  });
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;