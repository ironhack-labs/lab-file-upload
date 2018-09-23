const express    = require('express');
const router     = express.Router();
const { ensureLoggedIn } = require("connect-ensure-login");
const Post = require("../models/Post");

//GET -> /posts
router.get("/", ensureLoggedIn(), (req, res, next) => {
	Post.find({ creatorId: req.user._id })
	  	.populate("creatorId")
	  	.then(posts => {
			res.render('post/index', { posts });
	  	})
	  	.catch(err => {
			console.log(err)
			next(err);
	  	});
});

//GET -> /posts
// router.get('/create', (req, res, next) => {

// });

module.exports = router;