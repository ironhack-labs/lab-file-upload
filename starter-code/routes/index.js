const express = require('express');
const router  = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' })
const User = require('../models/user');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const Picture = require('../models/picture');
// Route to upload from project base path
var upload = multer({ dest: './public/uploads/' });

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



module.exports = router;
