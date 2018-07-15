const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require("multer")
const upload = multer ({dest:"./public/uploads/"})
const Post = require("../models/Post")
const Comment = require("../models/Comment")

/* GET home page. */
router.get('/new', ensureLoggedIn(),(req, res, next) => {
  res.render('post/newPost');
});

router.post('/new/:id',upload.single("file"), ensureLoggedIn(),(req, res, next) => {
    const {content} = req.body
    const picPath = `/uploads/${req.file.filename}`
    const picName = req.file.filename
    const creatorId= req.params.id
    Post.create([{content,picPath,picName,creatorId}])
    .then(data=>{
        console.log("post posted")
        res.redirect("/")
    })
    .catch(err=>{
        console.log(err)
    })
  });
  router.get('/:id', ensureLoggedIn(),(req, res, next) => {
    
    Post.find({creatorId:req.params.id})
    .then(posts=>{
        console.log("posts founded")
        res.render("index",{posts})
    })
    .catch(err=>{
        console.log(err)
    })
  });
  router.get('/show/:id',(req, res, next) => {
    
    Post.findById(req.params.id)
    .then(post=>{
        Comment.find({postId:post._id})
        .then(comments=>{
            console.log("posts founded")
            res.render("post/show",{post,comments})
        })
        
    })
    .catch(err=>{
        console.log(err)
    })
  });

module.exports = router;