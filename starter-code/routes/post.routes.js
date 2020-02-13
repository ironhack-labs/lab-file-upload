const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

const User = require('../models/User.model')
const Post = require('../models/Post.model')
const Comment = require('../models/Comment.model')


const uploadCloud = require("../configs/cloudinary.config");


router.get("/profile/post-form", ensureLoggedIn("/login"), (req, res) => res.render("posts/post-form"));

router.post(
    "/profile/post-form",
    uploadCloud.single("phototoupload"),
    (req, res, next) => {
        console.log(
            "Estamos en Post",
            req.file
        );

        Post.create({
            content: req.body.content,
            creatorId: req.user._id,
            picPath: req.file.secure_url,
            picName: req.body.picName
        })
            .then(() => res.redirect("/"))
            .catch(err => next(err));
    }
);

router.get("/post-details/:id", (req, res) => {
    const id = req.params.id;

    const postPromise = Post.findById(id)
    const commentPromise = Comment.find({ postId: `${id}` })

    Promise.all([postPromise, commentPromise])
        .then(results => res.render('posts/post-details', { post: results[0], comment: results[1] }))
        .catch(err => console.log(err))

    // Post.findById(id)
    //     .then(post => res.render("posts/post-details", { post }))
    //     .catch(err => console.log("Error consultando en la BBDD: ", err));


});

router.post(
    "/post-details/:id",
    uploadCloud.single("phototoupload"),
    (req, res, next) => {

        console.log(
            "Estamos en Comment",
            req.file
        );

        Comment.create({
            content: req.body.content,
            authorId: req.user._id,
            postId: req.params.id,
            imagePath: req.file.secure_url,
            imageName: req.body.imageName
        })
            .then(() => res.redirect(`/post-details/${req.params.id}`))
            .catch(err => next(err));
    }
);



module.exports = router;
