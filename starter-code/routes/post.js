const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Post = require('../models/post');
const multer = require('multer');
const upload = multer({ dest: './public/uploads' });

// GET new
router.get('/new', ensureLoggedIn(), (req, res, next) => {
	res.render('post/new');
});

// POST new
router.post('/new', [ ensureLoggedIn(), upload.single('photo') ], (req, res, next) => {
	const { content } = req.body;
	const picPath = req.file.path;
	const picName = req.file.filename;

	const creatorId = req.user.id;

	const newPost = new Post({
		content,
		picPath,
		picName,
		creatorId
	});

	newPost.save((err) => {
		if (err) {
			next(null, false, { message: newPost.errors });
		}
		return next(null, newPost);
	});

	res.redirect('/post');
});

// GET show

// GET index
router.get('/', (req, res, next) => {
	Post.find().then((data) => {
		res.render('post/list', { data });
	});
});

module.exports = router;
