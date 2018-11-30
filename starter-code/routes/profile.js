const express = require('express');
 const router = express.Router();
 const multer = require('multer')
 const uploader = multer({ dest: './public/posts' })
 const post = require('../models/post')
 const user = require('../models/user')


 router.get('/', (req, res, next) => {
  res.render('/views/profile/profile.hbs', {post})
 })

 router.post('/new', uploader.single('image'), (req, res, next) => {
  const { path, filename } = req.file
  const { content } = req.body
  console.log(path)
  const newPost = {
      content: content,
      creatorId: "5c00b36040eeaa9b430f43ae",
      picPath: '/posts/' + filename,
      filename: filename,
  }
  posts.create(newPost)
      .then(result => {
          user.findByIdAndUpdate("5c00b36040eeaa9b430f43ae", { $push: { post: result._id } })
              .then(user => {
                  res.redirect('/')
              }).catch(err => console.log(err))
      }).catch(err => console.log(err))
})
module.exports = router;
