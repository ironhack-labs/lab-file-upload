const express = require('express');
const router  = express.Router();
const Comment = require('../../models/Comment')
const Post = require('../../models/Post')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.post('/new/:id', ensureLoggedIn('/login'), (req, res, next) => {
  // console.log(req.file)
  // console.log(req.user)
  const c = {
    content:req.body.content,
    authorId:req.user._id,
  }
  Comment.create(c)
  .then(comment=>{
    // res.json(comment)
    Post.findByIdAndUpdate(req.params.id,{$push:{comments:comment._id}})
    .then(post=>{
      console.log(post)
      res.redirect('/posts/detail/' + post._id)
    })
    .catch(err=>{
      console.log(err)
    })
  })
  .catch(err=>{
    console.log(err)
  }) 
})

module.exports = router;