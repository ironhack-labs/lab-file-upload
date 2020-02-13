const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/User.model')
const Post = require('../models/Post.model')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


// Cloudinary

const uploadCloud = require('../configs/cloudinary.configs')


router.get('/', (req, res) => {
    Post.find()
    .populate('creatorId')
    .then(allPosts => res.render('./posts/list',{allPosts}))
    .catch(err => console.log('Se ha producido un error al consultar bbdd', err))


}) 

router.get('/create', ensureLoggedIn('/login'), (req,res)=>res.render('./posts/post-form'))

router.post('/create',[ ensureLoggedIn('/login'), uploadCloud.single('image')], (req, res) => {
    Post.create({
        content: req.body.content,
        creatorId: req.user.id,
        picPath: req.file.url,
        picName: req.file.originalname
    })
    .then(()=> res.redirect('/posts'))

})

router.get('/details/:id',(req, res) => {
    Post.findById(req.params.id)
    .populate('creatorId')
    .then(onePost => res.render('./posts/details', onePost))
    .catch(err => console.log('Se ha producido un error en bbdd', err))
})






module.exports = router