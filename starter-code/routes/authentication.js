const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require("multer");

router.get('/login', (req, res) => {
    console.log("test1")
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/', function(req, res, next) {
    res.render('authentication/signups');
  });
  
  const upload = multer({ dest: './public/images/' });
  
  router.post('/upload', upload.single('photo'), (req, res) =>{
    console.log('bliss');
    console.log(req.file);
  
  
    const pic = new Picture({
      name: req.body.name,
      path: `/images/${req.file.filename}`,
      originalName: req.file.originalname
    });
  
    pic.save((err) => {
        res.redirect('/');
    });
  });
  
  router.get("/images", (req,res)=>{
    Picture.find()
    .then(docs=>{
      res.render("list_pictures", {pictures:docs})
    })
    .catch(err=>{
      res.send(err);
    });
  
  });





module.exports = router;
