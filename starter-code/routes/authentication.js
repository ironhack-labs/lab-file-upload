const express = require('express');
const passport = require('passport');
const router = express.Router();
const uploadCloud = require("../configs/cloudinary")
const multer = require('multer')
const Picture = require('../models/user')
const upload = multer({ dest: './public/uploads/' })

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


//INICIO
router.get('/', (req, res) => {
    Picture.find()
        .then(allPictures => res.render("images/index", { pictures: allPictures }))
        .catch(err => console.log(err))
})


//SINGUP-REGISTRO
router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error') });
});

router.post('/signup', ensureLoggedOut(), uploadCloud.single("imgFile"), passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));

//LOGIN-INICIAR SESIÓN
router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error') });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

//PERFIL
router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user: req.user
    });
});

//LOGOUT.CERRAR SESIÓN
router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});


//UPLOAD-SUBIDA IMAGEN
router.get('/upload', (req, res) => res.render("images/upload"))

router.post('/upload', uploadCloud.single('imgFile'), (req, res) => { 

    console.log('La información que MULTER deja en req.file es:', req.file)

    Picture.create({ name: req.body.imgName, path: `/uploads/${req.file.filename}`, originalName: req.file.originalname })
        .then(() => res.redirect('/images'))
        .catch(err => console.log(err))
})

module.exports = router;
