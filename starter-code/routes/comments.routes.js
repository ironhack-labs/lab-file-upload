const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require("../models/User.model")
const Comment = require('../models/comment.model')

// Multer setup
const multer = require('multer')
const upload = multer({ dest: './public/uploads/' })



router.get('/new', (req, res) => {
    res.render('comments/new-comment')
})


router.post('/new/:id', upload.single('phototoupload'), (req, res, next) => {
    req.file ? null : req.file = {}
    const newPost = {
        imagePath: `/uploads/${req.file.filename}`,
        content: req.body.content,
        imageName: req.file.originalname,
        authorId: req.user.username,
        postId: req.params.id
    }

    Comment.create(newPost)
        .then(() => {
            res.redirect("/posts")

        })
        .catch(err => console.log("error al subir el post", err))

})


module.exports = router

