const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const Post       = require('../models/post');
const Comment   = require('../models/comment');
const uploadCloud = require('../config/cloudinary.js');
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

router.post('/signup', ensureLoggedOut(), uploadCloud.single('photo'), passport.authenticate('local-signup', {
	successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
    user : req.user
    });
});

router.get('/newpost', ensureLoggedIn('login'), (req, res) => {
	res.render('authentication/new')
})

router.post('/newpost', ensureLoggedIn('login'), uploadCloud.single('photo-post'), (req, res, next) => {
	const content = req.body.content;
	const creatorID = req.user._id;
	const newPost = new Post({
		content,
		creatorID,
		picName: req.file.originalname,
		picPath: req.file.url,
	});
	newPost.save()
	.then(() => {
		res.redirect('/');
	})

	.catch((err) => {
		console.log(err)
	})
	
})

const checkPhoto = () => {
	console.log('oi');
}


router.post('/post/:id', ensureLoggedIn('login'), uploadCloud.single('photo-comment'), (req, res, next) => {
  const postID = req.params.id;
	const content = req.body.content;
	const authorID = req.user._id;
	console.log('authorID é:  ', authorID);
	let newComment;
	if(req.file) {
		newComment = new Comment({
			content,
			authorID,
			imageName: req.file.originalname,
			imagePath: req.file.url,
		});
	} else {
		newComment = new Comment({
			content,
			authorID,
		});
	}
	newComment.save()
	.then(() => {
		res.redirect(`/post/${postID}`);
	})

	.catch((err) => {
		console.log('req file: ', req.file);
		console.log(err)
	})
	
})

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;