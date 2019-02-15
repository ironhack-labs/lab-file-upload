const express = require('express');
const router  = express.Router();
let uploadCloud = require('../helpers/cloudinary')
const Post = require('../models/Post')


//routes
router.get('/', (req,res,next)=>{
    Post.find()
    .then(posts=>res.render('index', {posts}))
    .catch(e=>next(e))
  })

router.post('/new',uploadCloud.single('picPath'), (req,res,next)=>{
  if (req.file) req.body.picPath = req.file.url 
    Post.create(req.body)
    .then(post=>{
      // res.render('posts/form', {post}) PONES O RES.REDIRECT O RES.RENDER
      res.redirect('/')
    })
    .catch(e=>next(e))
  })


router.get('/new',(req,res)=>{
    res.render("posts/form")
})

module.exports = router