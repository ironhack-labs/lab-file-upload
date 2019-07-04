const Posts = require('../models/Post')

exports.getAllPosts = (req, res, next) => {
  Posts.find()
    .then(posts => {
      res.render('index', { posts })
    })
    .catch(err => console.log(err))
}

exports.getCreate = (req, res, next) => {
  res.render('create')
}

exports.publishPost = (req, res, next) => {}
