const Post = require('../models/Posts')

exports.viewPostForm = (req, res, next) => {
  res.render('posts/new')
}

exports.createPost = async (req, res, next) => {
  // Get all the attributes from de body
  const {content, picName} = req.body
  const newPost = await Post.create({
    content,
    creatorId: req.user.id,
    picPath: req.file.path,
    picName: picName
  });
  res.render('/')
 }

exports.listPosts = async (req, res, next) => {
  // get all posts
  const allPosts = await Post.find().populate("creatorId")
  res.render('index', {allPosts})
}

exports.postDetails = async (req, res, next) => {
  // get post id from params to visulize post 
  const postId = req.params.postId
  // find post and render detail view with params
  const selectedPost = await Posts.findById(postId)
  res.render("/", selectedPost)
}

exports.deletePost = async (req, res, next) => {
  // get id from params
  const postId = req.params.postId;
  // delete post
  await Post.findByIdAndDelete(postId);
  res.render('/')
}