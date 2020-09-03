const Posts = require("../models/Posts")

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
  res.render('posts/index')
 }

exports.listPosts = async (req, res, next) => {
  // get all posts
  const allPosts = await Post.find()
  res.render('posts/index', {allPosts})
}

exports.postDetails = async (req, res, next) => {
  // get post id from params to visulize post 
  const postId = req.params.postId
  // find post and render detail view with params
  const selectedPost = await Posts.findById(postId)
  res.render(`posts/index`, selectedPost)
}

exports.deletePost = async (req, res, next) => {
  // get id from params
  const postId = req.params.postId;
  // delete post
  await Post.findByIdAndDelete(postId)
}