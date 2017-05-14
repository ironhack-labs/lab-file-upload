const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
var multer  = require('multer');
const Picture = require('../models/picture');
const Post = require('../models/post');
var upload = multer({ dest: './public/uploads/' });

router.get('/',(req,res) => {
  Post.find((err,posts) => {
    console.log(posts)
    res.render('index', { posts })
    })
});


router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error'),});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/profile',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    Picture.find((err, pictures) => {
      console.log('yoooo',pictures);
      res.render('authentication/profile', {pictures})
    });

});


router.post('/profile', upload.single('file'), function(req, res){

  let pic = new Picture({
    name: req.body.name,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  });

  pic.save((err) => {
      res.redirect('/profile');
  });
})




router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});


router.get('/new', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/new');
});

router.get('/create', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/create');
});


router.post('/create', upload.single('file'), function(req, res){

  let post = new Post({
    content: req.body.content,
    name: req.body.name,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  });

  post.save((err) => {
      res.redirect('/create');
  });
})



router.get('/show', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/show');
});


module.exports = router;
