const express = require('express');
const router = express.Router();
const ensureLogin = require('connect-ensure-login');
const multer = require("multer");
const Post = require('../models/Post');


const postPicPath = 'uploads/posts/';
const upload = multer({ dest: `./public/${postPicPath}` });


//GET -> /posts
router.get('/', ensureLogin.ensureLoggedIn(), (req, res, next) => {
	Post.find({ creatorId: req.user._id })
	  	.populate('creatorId')
	  	.then(posts => {
			posts.forEach(post => {
			  	post.canDelete = true;
			});
			
			//console.log('CREATORID', req.user._id);
			res.render('post/index', { posts, username:req.user.username, creatorId: req.user._id});

			
	  	})
	  	.catch(err => {
			console.log(err)
			next(err);
	  	});
});

//GET -> /posts/create
router.get('/create', ensureLogin.ensureLoggedIn(), (req, res, next) => {
	res.render('post/create');
});

router.post('/create', ensureLogin.ensureLoggedIn(), upload.single("post-pic"), (req, res, next) => {
	const { content } = req.body;
	let picPath;
	let picName;

	if(req.file){
		picPath = `/${postPicPath}/${req.file.filename}`;
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

router.get("/delete/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
	Post.findByIdAndRemove(req.params.id, () => res.redirect("/posts"));
});

router.get("/:id", (req, res, next) => {
	Post.findById(req.params.id)
	  	.populate("creatorId")
	  	.populate("comments.authorId")
	  	.then(post => { res.render("post/show", { post, errorMessage: req.flash("errorMessage") }) })
	  	.catch(err => { next(err);});
});

module.exports = router;