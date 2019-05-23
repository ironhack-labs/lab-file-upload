const express    = require('express')
const passport   = require('passport')
const router     = express.Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

const cloudinaryConfig = require('../config/cloudinary.config')
const User = require ('../models/user')
const Post = require('../models/post')


router.get('/list', (req, res)=>{
    Post.find()
        .then(posts => res.render('posts/post-list', { posts, user : req.user }))
        .catch(err => console.log('Error!:', err))
})






router.get('/add', (req, res)=> res.render('posts/post-add'))

router.post('/add', cloudinaryConfig.single('photo'), (req, res)=>{
   
    const {content} = req.body
    const imgPath = req.file.url
    const imgName = req.file.originalname

    const newPost = new Post ({content, imgPath, imgName})

    newPost.save()
        .then(x=>res.redirect('list'))
        .catch(err => console.log('Error!:', err))
})





module.exports = router