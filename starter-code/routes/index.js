const express = require('express');
const router  = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Posts = require("../models/posts");


const {createPostView,postPost,detailPost,detailPostPost}=require("../controllers/postsControllers.js")
const {commentView, commentPost}=require("../controllers/commentsControllers.js")


router.get('/', async(req, res, next) => {
  const posts=await Posts.find()
  res.render('index', { posts });
});


//POST PAGES
router.get('/create', ensureLoggedIn('/login'), createPostView)
router.post("/create", ensureLoggedIn('/login'), uploadCloud.single('picPath'), postPost)

router.get('/posts/:id', ensureLoggedIn('/login'), detailPost)



//Comment PAGES
router.get('/comment/:id', ensureLoggedIn('/login'), commentView)
router.post("/comment/:id", ensureLoggedIn('/login'), commentPost)






module.exports = router;
