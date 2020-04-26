const Post = require('../models/Post.model')
const User = require('../models/User.model')

exports.newPost = (req, res) => {
  res.render('post/newPost')
}

exports.newPostProcess = async (req, res) => {
  const { content, user } = req.body
  const { url: picPath, originalname: picName } = req.file

  const newPost = await Post.create({ content, user, picName, picPath, creatorId: req.user.id })

  res.redirect('/posts')
}

exports.postsView = async (req, res) => {
  const posts = await Post.find().populate('creatorId')
  res.render('post/posts', { posts })
}

exports.newCommentProcess = async (req, res) => {
  const { content, user } = req.body
  const { url: imagePath, originalname: imageName } = req.file
  const { id } = req.user

  const newComment = await Post.findByIdAndUpdate(
    id,
    { comment: content, user, imageName, imagePath },
    { new: true }
  )

  res.redirect('/posts')
}
