const express = require('express');
const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });


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

router.post('/signup', upload.single('photo'), passport.authenticate('local-signup', {
    failureRedirect: '/signup',
    failureFlash: true
  }, ((req, res) => {
    const { username, email, password, avatar } = req.body;
    const user = {
      username,
      email,
      password,
      avatar: {
        name: req.body.name,
        path: `/uploads/${req.body.filename}`,
        filename: req.body.filename,
      }
    }
  }).then(UserInfo => )
})
//(req, res) => {}))
// }).then(userInfo => {
//   (upload.single('photo'), ((req, res) => {
//     userInfo[avatar] = {
//       name: req.body.name,
//       path: `/uploads/${req.body.filename}`,
//       filename: req.body.filename,
//     }
//     userInfo.save((err) => {
//       if (err) return res.render('authentication/signup', { error: 'Upload failed' })
//       else {
//         return res.redirect('/')
//       }
//     })
//   }))
// }))

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
  res.render('authentication/profile', {
    user: req.user
  });
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/upload', ((req, res) => {
const avatar = {
  name: req.body.name,
  path: `/uploads/${req.body.filename}`,
  filename: req.body.filename,

}
}))
})
module.exports = router;