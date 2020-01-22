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

router.get('/profile', ensureLoggedIn('/login'), isUserProfilePhoto)
 
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



const isUserProfilePhoto = (req, res, next) => {
    Picture.find((err, pictures) => {
        const photouser = pictures.filter((image) => {
            const userId = req.user._id;
            const creatorId = image.creatorID;
             return (String(userId) ===  String(creatorId))         
        } )
        res.render('authentication/profile', {photouser, username:req.user.username})
      })
}

const filterPictureArray = (userId, picturesArray) => {
    return picturesArray.filter(image => {
        creatorID = image.creatorID;
        return String(userId) === String(creatorID)
    })
}

const getPhotos = (model, userId) => {
    return model.find((err, picturesArr) => {
        filterPictureArray(userId, picturesArr)
    }) 
}

const getPhotosMddlewere = (req, res, next) => {
    const userId = req.user._id;
    const photoArr = getPhotos(Picture, userId);
    res.render('authentication/profile', {})
}

module.exports = router;

