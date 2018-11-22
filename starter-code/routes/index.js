const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary.js');

const cloudinary = require("../config/cloudinary")
const Post = require("../models/Post")
const User = require("../models/user")
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});


router.get("/new", (req, res) => {
  res.render("authentication/new")
})

router.post('/new', uploadCloud.single('photo'), (req, res, next) => {
  const { content } = req.body;
  const creatorID = req.user.id;
  const picPath = req.file.url;
  const picName = req.file.originalname;
  const newPost = new Post({ content, creatorID, picName, picPath })
  newPost.save()
    .then(post => {
      // console.log(post._id)
      console.log(creatorID)

      User.findByIdAndUpdate({ _id: req.user._id }, {
        $push: { posts: { post: post._id } }
      })
        .then((user) =>

          res.redirect('/'));

    })
    .catch(error => {
      console.log(error);
    })
});

router.get("/show", (req, res) => {
  Post.find()
    .then((posts) => {
      res.render("authentication/show", { posts })
        .catch((error) => error)
    })
})

router.post("/show/:id", (req, res) => {
  const { content } = req.body;
  const authorId = req.user._id;
  const newCommentary = { content, authorId }
  newCommentary
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        comments: newCommentary
      }
    })
    .then((comments) => {
      res.render("authentication/show", { posts })
    })
    .catch((error) => error)
})

module.exports = router;
