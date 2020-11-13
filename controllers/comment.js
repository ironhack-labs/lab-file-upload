const Comment = require('../models/Comment')
const Post = require('../models/Post')

exports.newComment = (req, res) => {
  console.log(req.params.id)
  res.render('comment/new', {postId: req.params.id})
}

exports.createComment = (req, res) => {
  const postId = req.params.id
  const authorId = req.session.currentUser._id
  const { content } = req.body
  let newComment = {}

  if ('file' in req) {
    newComment = {
      authorId,
      content,
      imagePath: req.file.path,
      imageName: req.file.originalname
    }
  } else {
    newComment = {
      authorId,
      content
    }
  }
  
  Comment.create(newComment)
  .then(comment => {
    console.log(comment)
    Post.findByIdAndUpdate(postId, { $push: { comments: comment } })
    .then(updatedPost => {
      console.log(updatedPost)
      res.redirect(`/${postId}`)
    })
    .catch(error => console.log(error))
  })
  .catch(error => {
    console.log(error)
    res.redirect('/new-post')
  })
}