const express = require('express');
const passport = require('passport');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const moment = require('moment');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get("/profile/:id", (req, res) => {
    const paraid = req.params.id;
    let currentid = req.user._id;
    if (req.isUnauthenticated()) {
        currentid = 0;
    }
    Post
        // .find({creatorId : User._id})
        .find({ creatorId: req.params.id })
        .sort({
            created_at: -1
        })
        .exec((err, posts) => {
            res.render(`profile/profile`, {
                posts,
                moment,
                paraid,
                currentid,
               
            });
        });
})

router.get("/createpost", (req, res, next) => {
    res.render("profile/createpost");
})

router.post("/createpost", (req, res, next) => {
    const userId = req.user._id;
    User.findOne({
        _id: userId
    }).exec((err, user) => {
        if (err) {
            return;
        }

        const newPost = new Post({
            content: req.body.content,
            creatorId: user._id,
            picPath: req.body.picPath,
            picName: req.body.picName
        });

        newPost.save((err) => {
            if (err) {
                res.render("/", {
                    username: user.username,
                    errorMessage: err.errors.tweet.message
                });
            } else {
                res.redirect("/home");
            }
        });
    });
});

module.exports = router;