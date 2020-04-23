const express = require('express')
const router = express.Router()
const Post = require('../models/Post.model')
const passport = require('passport')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer')
const upload = multer({dest: './public/uploads/'})


router.get('/', (req,res,next) => res.render('post/post-form'))

router.post('/post-form', (req, res, next) => {

        Post.create({
            content: req.body.content,
            creatorId: req.user._id,
            picPath: req.user.picture,
            picName: req.user.username
    })
    .then(() => res.redirect('/'))
    .catch(err => next(err))
})