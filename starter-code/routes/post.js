let router = require('express').Router()
let Post = require('../models/Post')
let Comment = require('../models/Comment')

router.post('/detail/:id', (req,res,next)=>{
  let comment = new Comment(req.body)
  comment.post = req.params.id
  comment.save()
  .then(()=>{
    res.redirect('/posts/show/' + req.params.id )
  })
})

router.get('/detail/:id', (req,res,next)=>{
  Promise.all([
    Post.findById(req.params.id), 
    Comment.find({post:req.params.id})
  ])
  .then(results=>{
    let post = results[0]
    post.comments = results[1]
    res.render('posts/show', post)
  })
  .catch(e=>next(e))
})

router.post('/profile/:id', (req,res,next)=>{
  Post.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(post=>res.redirect('/posts/profile'))
  .catch(e=>next(e))
})

router.get('/profile/:id', (req,res,next)=>{
  Post.findById(req.params.id)
  .then(post=>res.render('posts/edit', post))
  .catch(e=>next(e))
})

router.get('/profile', (req,res,next)=>{
  Post.find()
  .then(posts=>res.render('posts/profile', {posts}))
  .catch(e=>next(e))
})

router.get("/new", (req,res)=>{
  res.render('posts/form')
})

router.post("/new", (req,res, next)=>{
  Post.create(req.body)
  .then(post=>{
    res.render('posts/form', {message: "Tu post se creó"})
  })
  .catch(e=>next(e))
})

module.exports = router