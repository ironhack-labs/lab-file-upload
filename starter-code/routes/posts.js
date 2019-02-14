const express = require('express');
const router  = express.Router();
let User = require('../models/User')
let Post = require('../models/Post')
let Comment = require('../models/Comment')
let {isLogged} = require('../helpers/middlewares')
let multer = require('multer')
let upload = multer({dest: './public/images/uploads'})


router.get('/new', isLogged, (req, res, next) => {
  res.render('posts/new')
})

router.post('/new', isLogged, upload.single('postPic'), (req, res, next) => {
  let newPost = new Post({
    content: req.body.postContent,
    picPath: `/images/uploads/${req.file.filename}`,
    picName: req.body.postName,
    creatorId: req.user._id
  })
  newPost.save()
  .then(()=>res.redirect('/posts'))
  .catch(e=>next(e))
})


router.get('/:id', (req, res, next) => {
  Promise.all([
    Post.findById(req.params.id), 
    Comment.find({postId:req.params.id})
  ])
  .then(results=>{
    let post = results[0]
    post.comments = results[1]
    res.render('posts/show', post)
  })
  .catch(e=>next(e)) 
})

router.post('/:id', upload.single('commentPic'), (req, res, next) => {
  console.log(req.body)
  let comment = new Comment({
    comment: req.body.comment,
    postId: req.params.id,
    author: req.user.username,
    authorId: req.user._id
  })
  if(req.file) {
    comment.imagePath = `/images/uploads/${req.file.filename}`
  }
  console.log(comment)
  comment.save()
  .then(r=>{
    res.redirect('/posts/'+req.params.id)
  })
  .catch(e=>next(e))
})


router.get('/', (req, res, next) => {
  Post.find()
  .then(posts=>{
    res.render('posts/index', {posts})
  })
  .catch(e=>next(e))
});


module.exports = router;