const express = require('express');
const router  = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const multer = require('multer');
const Post = require('../models/Post');

const upload = multer({ dest: './uploads/posts/' });

router.get('/', ensureLoggedIn(), (req, res, next) => {
	Post.find({ creatorId: req.user._id })
		.populate('creatorId')
		.then(posts => {
			res.render('post/index', { posts });
		})
		.catch(err => next(err));
});


router.get('/create', ensureLoggedIn(), (req, res, next) => {
	res.render('post/create');
});

router.post('/create', ensureLoggedIn(), upload.single('post-photo'), (req, res, next) => {
	const {content} = req.body;
	const creatorId = req.user._id;
	const picPath = req.file.filename;
	const picName = req.file.originalName;

	const post = new Post({ content, creatorId,	picPath, picName});

	post.save()
		.then(post => {
			console.log('POST', post);
			res.redirect('/posts');
		})
		.catch(err => { 
			res.render('/post/create', { errorMessage: err.message });
		 });
})

router.get('/delete/:id', ensureLoggedIn(), (req, res) => {
	Post.findByIdAndRemove(req.params.id, () => res.redirect('/posts'));
});

router.get('/:id', (req, res, next) => {
	Post.findById(req.params.id)
		.populate('creatorId')
		.then(post => 
			res.render('post/show', { post, errorMessage: req.flash('errorMessage') })
	  	)
	  	.catch(err => {
			next(err);
	  	})
});

module.exports = router;