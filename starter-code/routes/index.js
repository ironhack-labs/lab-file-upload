const express = require('express');
const Post = require('../models/Post');
const router  = express.Router();

/* GET home page. ALL THE POSTS*/
router.get('/', (req, res, next) => {
	  Post.find()
	  	.populate("creatorId")
  		.then((posts) => {
			
			posts.forEach(post => {
				if (post.creatorId.username === req.user.username){
					post.canDelete = true;
				}
			});
			
	  		res.render('index', { posts:posts, title:'IronTumblr' });
  		})
  		.catch((error) => {
	  		console.log(error)
  		})
});


module.exports = router;
