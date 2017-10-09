const express = require('express');
const router  = express.Router();
const multer  = require('multer');
// Route to upload from project base path
const upload = multer({ dest: 'uploads/' }) 
const User = require('../models/user');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const Picture = require('../models/picture');
 

/* GET home page. */
router
.get('/', (req, res, next) => {
		res.render('index');
});

router
.get('/signup', (req, res, next) => {
		res.render('authentication/signup', { "message": req.flash("error") });
});


router
.post('/signup', upload.single('photo'), function(req, res, next){

	const photo = new Picture({
		path: `/uploads/${req.file.filename}`,
		originalName: req.file.originalname
	});

	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		photo: photo,
	});

	user.save((err) => {
		photo.save((err) => {
			res.render("authentication/profile", {user});
		});
	});

	//res.redirect('profile', {user}); ????
});


router
.get("/login", (req, res, next) => {
	res.render("authentication/login", { "message": req.flash("error") });
});

router
.post("/login", passport.authenticate("local-login", {
	successRedirect: "/profile",
	failureRedirect: "/login",
	failureFlash: true,
	passReqToCallback: true
}));


router
.get('/profile', ensureAuthenticated, (req, res) => {
	res.render('authentication/profile', {user: req.user});
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next(); 
	} else {
		res.redirect('/login')
	}
}

module.exports = router;
