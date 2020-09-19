const express = require('express');
const PostModel = require('../models/Post.model');
const fileUploader = require('../configs/cloudinary.config');
const router = express.Router();


/* GET home page */
router.get('/', (req, res) => {
  res.render('index')

});

router.get('/create', (req, res) => {
  res.render('posts/create')
})

router.post('/create', fileUploader.single('image'), (req, res) => {
  const { content } = req.body
  // console.log(req.body)
  // console.log(req.file)

  PostModel.create( {content, picPath: req.file.path, picName: req.file.filename})
    .then(() => res.redirect('/posts'))
    .catch(err => console.log(err))
})

router.get('/posts', (req, res) => {
  PostModel.find()
    .then(postFromDB => {
      console.log(postFromDB)
      res.render('posts/posts', {postFromDB})
    })
    .catch(err => console.log(err))
})

router.get('/details/:id', (req, res) => {
  const id = req.params.id
  console.log(id)

  PostModel.findById(id)
    .then(postFromDB => {
      console.log(postFromDB)
      res.render('posts/details', postFromDB)
    })
    .catch( err => console.log(err))
 
})

module.exports = router;
