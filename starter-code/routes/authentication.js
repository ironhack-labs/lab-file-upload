const express = require('express');
const passport = require('passport');
//usamos passport solo para login y middleware para preguntar si estamos logeados
const router = express.Router();
// const multer = require('multer'); lo comento porque lo he puesto en cloudinary.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
//no usamos passport para el registro, pero requerimos bcrypt para hacer las contraseñas
const salt = bcrypt.genSaltSync(10);
const cloudinary = require('../options/cloudinary');

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/login', ensureLoggedOut(), (req, res) => {
	res.render('authentication/login', { message: req.flash('error') });
});

router.post(
	'/login',
	ensureLoggedOut(),
	passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	})
);

router.get('/signup', ensureLoggedOut(), (req, res) => {
	res.render('authentication/signup', { message: req.flash('error') });
});
//nosotros le hemos puesto cloudinary en lugar de uploadcloud
router.post('/signup', cloudinary.single('photo'), (req, res, next) => {
	console.log(req.file);
	const myUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, salt),
		photoPath: req.file.secure_url
	});
	//para que se ejecute en mongo tiene que llevar la promesa (then)
	myUser
		.save()
		.then((payload) => {
			console.log('user was saved succesfully', payload);
			res.redirect('/');
		})
		.catch((err) => console.log('an error trying save the new user in db', err));
});

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
	res.render('authentication/profile', {
		user: req.user
	});
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
