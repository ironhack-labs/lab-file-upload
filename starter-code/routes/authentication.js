const express    = require('express');
// Solamente usamos passport para el login
const passport   = require('passport');
const router     = express.Router();
// Quitamos esta dependencia porque en cloudinary ya está requeriada // const multer = require ("multer");
const User = require ("../models/user");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const cloudinary = require("../options/cloudinary");


const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

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

//cloudinary.single("photo") el nombre cloudinary lo cogemos de la const de arriba
router.post("/signup", cloudinary.single("photo"), (req, res, next) => {
    console.log(req.file);
    const myUser = new User ({
        username: req.body.username,
        email: req.body.mail,
        password: bcrypt.hashSync(req.body.password, salt),
        photoPath: req.file.secure_url
    })
    //guardar en nuestra base de datos de mongo
    myUser//hay que pasarle el usuario que queremos crear, en este caso es el myUser
    .save()
    .then(payload =>  {
     console.log("User has been created successfully", payload)   
     res.redirect("/")
    })
    .catch(err => console.log("Something went wrong", err))
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
