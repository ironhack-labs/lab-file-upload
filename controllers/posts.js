const mongoose = require("mongoose")
const Post = require("../models/Post.model")
const Comment = require("../models/Comments.model")


///////POSTS/////

// C
exports.newPostView = (req, res) => res.render("posts/post-new")

exports.newPostProcess = async (req, res) => {
  const { content, picName } = req.body;
  const { path } = req.file

  await Post.create({
    creatorId: req.session.currentUser._id,
    content,
    picName,
    picPath: path,
  })
  res.redirect("/posts")
}


// R
exports.allPosts = async (req, res) => {
  const posts = await Post.find().populate("creatorId")
  res.render("posts/posts", { posts } )
}

exports.detailPost = async (req, res) => {
  const { id } = req.params
  const onePost = await Post.findById(id).populate("creatorId comments")
  res.render("posts/post-detail", onePost)
}

// D

exports.deletePost = async (req, res) => {
  await Post.findByIdAndRemove(req.params.postId)
  res.redirect("/posts")
}


/////COMMENTS//////

exports.newCommentProcess = async (req, res) => {
  const { content, imageName } = req.body
  let comment 
  if (req.file){
    comment = await Comment.create({
      creatorId: req.session.currentUser._id,
      content,
      imageName,
      imagePath: req.file || null
    })
  } else {
    comment = await Comment.create({
      creatorId: req.session.currentUser._id,
      content,
      imageName,    
  })
}
  const { id } = req.params
  await Post.findByIdAndUpdate(id, { $push: { comments: comment._id } }, { new:true })
  res.redirect("/posts")
}