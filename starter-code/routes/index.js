const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


router.get('/', (req, res, next) => {
	Post.find()
		.populate('creatorId')
		.then(posts => {
			res.render('index', { posts	, title: 'IronTumblr'});
		})
		.catch(err => {
			next(err);
		});
});

module.exports = router;