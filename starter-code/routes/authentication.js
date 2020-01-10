const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Picture = require('../models/picture');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

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
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    Picture.find((err, pictures) => {
        const photouser = pictures.filter((image) => {
            const userId = req.user._id;
            const creatorId = image.creatorID;
            String(userId) ===  String(creatorId)
        } )
        console.log(`JJJJJJJJJJJJJ`,photouser)
        res.render('authentication/profile', {pictures, username:req.user.username})
      })

});
 
router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/cadastrophoto', ensureLoggedIn('/login'), (req,res) => {
    Picture.find((err, pictures) => {
        res.render('authentication/cadastro', {pictures})
    })
});

router.post('/cadastrophoto', upload.single('photo'), (req, res) => {
    const pic = new Picture({
        name: req.body.name,
        path: `/uploads/${req.file.filename}`,
        originalName: req.file.originalname,
        creatorID: req.user._doc._id,
    })

    pic.save((err) =>{
        res.redirect('/')
    })
})
module.exports = router;
