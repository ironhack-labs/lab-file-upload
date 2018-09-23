const express = require('express');
const Post = require('../models/Post');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  	Post.find()
  		.then((posts) => {
			console.log('USER', req.user);
	  		res.render('index', { posts:posts, title:'IronTumblr' });
  		})
  		.catch((error) => {
	  		console.log(error)
  		})
});



module.exports = router;
