const express = require('express')
const router = express.Router()
const multer = require('multer')
const Post = require('../models/post.model')
const User = require('../models/User.model');

// File upload settings
const uploadLocal = multer({ dest: './public/uploads/' })

router.get('/post', (req, res, next) => res.render('create-post'))

router.post('/post', uploadLocal.single('photo'), (req, res) => {
    console.log(req.user)
    const newPost = {
        content: req.body.content,
        creatorId: req.user._id,
        picPath: `/uploads/${req.file.filename}`,
        picName: req.file.originalname
    }
    Post.create(newPost)
        .then((res.redirect('/profile')))
        .catch(err => next(err))
})


router.get('/details/:id', (req, res, next) => {

    Post.findById(req.params.id)
        .then(thePost => res.render('post-details', thePost))
        .catch(err => next(err))
})



module.exports = router;