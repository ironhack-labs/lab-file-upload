const express    = require('express')
const passport   = require('passport')
const router     = express.Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

const cloudinaryConfig = require('../config/cloudinary.config')
const User = require ('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')



router.get('/list', (req, res)=>{
    Post.find()
        .then((posts, comment) => res.render('posts/post-list', { posts, comment, user : req.user }))
        .catch(err => console.log('Error!:', err))
})






router.get('/add', ensureLoggedIn(), (req, res)=> res.render('posts/post-add'))

router.post('/add', cloudinaryConfig.single('photo'), (req, res)=>{
   
    const {content} = req.body
    const imgPath = req.file.url
    const imgName = req.file.originalname

    const newPost = new Post ({content, imgPath, imgName})

    newPost.save()
        .then(x=>res.redirect('list'))
        .catch(err => console.log('Error!:', err))
})



router.get('/comment', ensureLoggedIn(), (req, res)=> {
    Post.findById(req.query.post_id)
    .then(x=>res.render('posts/post-comment')
    .catch(error => console.log(error))
)})

router.post('/comment', cloudinaryConfig.single('photo'), (req, res) => {
  const { content } = req.body
  const imgPath = req.file.url
  const imgName = req.file.originalname

  const newComment = new Comment({ content, imgPath, imgName })
  newComment.save()
    .then(x => res.redirect('/posts/list'))
    .catch(error => console.log(error))
})





  

module.exports = router