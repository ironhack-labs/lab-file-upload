const express = require('express')
const moment = require('moment')
const multer = require("multer");
const User = require('../models/user')
const Post = require('../models/post')
const postController = express.Router()
const upload = multer({ dest: "./public/posts" });


postController.get('/new', (req, res, next) => {
    res.render('posts/new')
})

postController.post("/", upload.single("photo"), (req, res, next) => {
  const user = req.session.currentUser;

  User.findOne({ user: req.user }).exec((err, user) => {
    if (err) {
      return;
    }

    const newPost = new Post({
      content: req.body.postText,
      creatorId: req.user._id,
      imgPath: `/posts/${req.file.filename}`,
      imgName: req.file.originalname
    });

    newPost.save((err,post) => {
      if (err) {
        res.render("posts/new", {
          username: user.username,
          errorMessage: err.errors.post.message
        });
      } else {
        res.redirect("posts/index", {
            user
        });
      }
    });
  });
});

postController.get('/', (req, res, next) => {
    User.findOne({ username: req.user}, '_id user')
    .exec((err, user) => {
        if(!user) {
            return 
        }

        Post.find({"username": user.username}, 'post created_at')
        .sort({ created_at: -1})
        .exec((err, posts) => {
            res.render('posts/index', {
                user: user.username,
                posts,
                moment
            })
        })
    })
})

module.exports = postController