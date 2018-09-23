const express = require('express');
const router = express.Router();
const ensureLogin = require('connect-ensure-login');
const multer = require("multer");
const Post = require('../models/Post');

const commentsPath = "uploads/comments/";
const upload = multer({ dest: `./public/${commentsPath}` });

router.post("/create/:postId", ensureLogin.ensureLoggedIn(), upload.single("image"), (req, res, next) => {
	const { content } = req.body;
	let imagePath;
	let imageName;
	if (req.file) {
	  	imagePath = `/${commentsPath}/${req.file.filename}`;
	  	imageName = req.file.originalname;
	}
  
	Post.findById(req.params.postId)
	  	.then(post => {
			const newComment = {
		  		content,
		  		imagePath,
		  		imageName,
		  		authorId: req.user._id
			};
			post.comments.push(newComment);
  
			return post.save();
	  	})
	  	.then (post => {
			res.redirect(`/posts/${req.params.postId}`);
	  	})
	  	.catch(err => {
			req.flash("errorMessage", err.message);
			res.redirect(`/posts/${req.params.postId}`);
	  	});
});
  
module.exports = router;