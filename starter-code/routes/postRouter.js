const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("connect-ensure-login");
const multer = require("multer");
const Post = require("../models/post");

router.get("/", ensureLoggedIn(), (req, res, next) => {
    Post.find({ creatorId: req.user._id })
        .populate('creatorId')
        .then(posts => {
            res.render("post/index", { posts });
        })
        .catch(err => {
            next(err);
        });
});

router.get("/create", ensureLoggedIn(), (req, res) => {
    res.render("post/create");
});

module.exports = router;