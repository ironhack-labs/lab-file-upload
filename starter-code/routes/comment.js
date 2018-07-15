const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require("multer")
const upload = multer ({dest:"./public/uploads/"})
const Post = require("../models/Post")
const Comment = require("../models/Comment")


router.post('/new/:id', upload.single("file"), ensureLoggedIn(), (req, res, next) => {
    const content = req.body.content
    var picPath
    var picName
    if (req.file) {
        picPath = `/uploads/${req.file.filename}`
        picName = req.file.filename
    }

    const creatorId = req.user._id
    const postId = req.params.id

    Comment.create([{ content, picPath, picName, creatorId, postId }])
        .then(comments => {
            console.log("new comment")
            console.log(req.body.content)
            console.log(comments)

            res.redirect(`/post/show/${req.params.id}`)
        })
        .catch(err => {
            console.log(err)
        })
});

  module.exports = router