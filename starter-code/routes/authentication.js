const express    = require('express').Router(); //esto era ES6? 
const passport   = require('passport');
const mongoose = require('mongoose') // importo mongoose del npm que instalé
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/user') //no estoy segura si debía importarlo, pero según yo sí para iniciar sesión y hacer cosas con perfil, etc.
const uploadCloud = require('../handlers/cloudinary') // importo la función para el archivo

//LOGIN
router.get('/login', ensureLoggedOut(), (req, res) => { //para qué es ensureLoggedOut() ? ---> no debería ver más bien si está loggin?
    res.render('authentication/login', { message: req.flash('error')});
});

/* NO DEBERÍAMOS USAR ALGO COMO ESTO?
function isActive(req, res, next) {
  if (!req.isAuthenticated()) return res.redirect('/login')
  if (req.user.status !== 'Active')
    return res.send('Por favor confirma tu cuenta en tu correo')
  next()
}

*/

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

//SIGNUP
router.get('/signup', ensureLoggedOut(), uploadCloud.single('photoURL'), (req, res) => {
    user.register(
        {...req.body, photoURL: req.file.secure_url }, req.password //secure_url es para que tenga el https
    ) //pedí datos para signup
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));


//PROFILE
router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

//LOGOUT
router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
