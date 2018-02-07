const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const User = require('../models/user')
const Post = require('../models/Post')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const moment = require("moment");


router.get("/home/id", (req, res) => {
    Post
        .find({creatorId : req.user._id})
        .sort({
            created_at: -1
        })
        .exec((err, posts) => {
            console.log(posts)
            res.render("profile/home", {
                posts,
                moment
            });
        });
});

router.get("/createpost", (req,res,next)=> {
    res.render("profile/createpost");
})

router.post("/createpost", (req, res, next) => {
    const userId = req.user._id;

    console.log(userId);

    User.findOne({
        _id: userId
    }).exec((err, user) => {
        if (err) {
            return;
        }
        const newPost = new Post({
            content: req.body.content,
            creatorId: user._id,
            // picPath: req.body.picPath,
            // picName: req.body.picName
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