const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const uploadCloud = require('../config/cloudinary.js');

router.get("/post/:id", (req, res, next) => {
    Post.findById(req.params.id)
    .then(posted => {
        res.render("post/post",{post:posted});
    })
});

router.post("/new-post", uploadCloud.single('photo'), (req, res, next) => {
    const content = req.body.content;
    const author = req.user.username;
    const comments = "";
    const imgPath = req.file.url;
    const imgName = req.file.originalname;
    const newPost = new Post({
        content,
        author,
        comments,
        imgPath,
        imgName
    });
    newPost.save()
        .then(() => {
            res.redirect(`/post/post/${newPost._id}` ) ;
        })
        .catch(err => {
            res.render("auth/profile", { message: "Something went wrong" });
        })
});

router.get("/all-post",(req, res, next) => {
    Post.find()
    .then(posted => {
        res.render("post/all-post",{post:posted});
    })
});

module.exports = router;
