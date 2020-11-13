const User = require('../models/User')
const Post = require('../models/Post')

exports.getPostForm = (req, res) => {
  res.render('post/new')
}

exports.createPost = (req, res) => {

  const creatorId = req.session.currentUser._id
  const { content } = req.body

  Post.create({
    creatorId,
    content,
    picPath: req.file.path,
    picName: req.file.originalname
  })
  .then(newPost => {
    console.log(newPost)
    res.redirect("/")
  })
  .catch(error => {
    console.log(error)
    res.redirect('/new-post')
  })
}

exports.displayPosts = (req, res) => {
  Post.find().populate('creatorId')
  .then(posts => {
    console.log(posts)
    res.render('post/posts', { posts })
  })
}

exports.postDetails = (req, res) => {
  Post.findById(req.params.id)
  .populate('creatorId')
  .populate('comments')
  .then(post => {
    console.log(post.comments)
    res.render('post/post', post)
  })
  .catch(error => console.log(error))
}