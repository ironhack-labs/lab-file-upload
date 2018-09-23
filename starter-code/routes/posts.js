const express    = require('express');
const router     = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const multer = require("multer");
const Post = require('../models/Post');

const upload = multer({ dest: './public/uploads/posts/' });

//GET -> /posts
router.get('/', ensureLoggedIn(), (req, res, next) => {
	Post.find({ creatorId: req.user._id })
	  	.populate('creatorId')
	  	.then(posts => {
			res.render('post/index', { posts });
	  	})
	  	.catch(err => {
			console.log(err)
			next(err);
	  	});
});

//GET -> /posts/create
router.get('/create', ensureLoggedIn(), (req, res, next) => {
	res.render('post/create');
});

router.post('/create', ensureLoggedIn(), upload.single("post-pic"), (req, res, next) => {
	const { content } = req.body;
	let picPath;
	let picName;

	if(req.file){
		picPath = req.file.filename;
		picName = req.file.originalname;
	}

	const checkFile = new Promise((resolve, reject) => {
		if (!picPath || !picName) {
		  	reject(new Error("Select a picture."));
		} else {
		  	resolve();
		}
	});

	checkFile.then(() => {
		const newPost = new Post({ content, picPath, picName, creatorId: req.user._id });
		return newPost.save();
	  	})
	  	.then (post => {
			res.redirect("/posts");
	  	})
	  	.catch(err => {
			res.render("post/create", {
		  	errorMessage: err.message
			});
	  	});
});


module.exports = router;