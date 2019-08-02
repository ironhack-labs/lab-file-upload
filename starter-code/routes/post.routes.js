const express    = require('express')
const passport   = require('passport')
const router     = express.Router()
const User = require('../models/user')
const Post = require('../models/post.model')
const uploadCloud = require('../configs/cloudinary.config')

router.get('/new-post', (req,res,next)=> res.render('new-post'))
router.post('/new-post',uploadCloud.single('photo'), (req,res,next)=>{
    const {content, picName} = req.body
    const photo = req.file.secure_url
    Post.create({content,picName, photo})
    .then(()=> res.redirect('/post/new-post'))
})
router.get('/post-list', (req,res,next)=> {
    Post.find({})
    .then((allThePosts)=> {
        console.log(allThePosts)
        res.render('post-list', {posts: allThePosts})
    })
})

module.exports = router