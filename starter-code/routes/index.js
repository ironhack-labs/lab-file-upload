const express = require("express");
const router = express.Router();
const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')
const uploadCloud = require('../config/cloudinary')

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

/* GET home page */
router.get('/', async (req, res) => {
  const allPosts = await Post.find().populate('creator comments.creator')
  let userData = ''
  if (req.session.currentUser) {
    const { _id: id } = req.session.currentUser
    userData = { id, login: true }
  } else {
    userData = { id: false, login: false }
  }
  // const allComments = allPosts.map(async post => {
  //   const comments = await Post.findById(post._id, 'comments')
  //   const commentsArray = await comments._doc.comments.map(comment => {
  //     console.log("comment: " + comment.comment)
  //     return new Promise(resolve => resolve(comment.comment))
  //   })
  //   console.log("commentsArray: " + commentsArray)
  //   return new Promise(resolve => resolve(commentsArray))
  // })
  // console.log("allcomments: " + (allComments[1]))
  // console.log(Object.keys(comments._doc))
  // console.log(comments._doc.comments[1].comment) //  <=== Aquí está la clave del éxito!!!
  // comments._doc.forEach(e => {
  //   console.log("item: " + e)
  // })
  // console.log(comments, userData)
  res.render("index", { allPosts, userData });
});

router.post('/post', uploadCloud.single('postImg'), async (req, res) => {
  const { postText } = req.body
  const { originalname: picName, url: picPath } = req.file
  await Post.create({ content: postText, creator: req.session.currentUser._id, picName, picPath })
  res.redirect('/')
})

router.post('/post/:id/comment', uploadCloud.single('commentImg'), async (req, res, next) => {
  const { id } = req.params
  const { comment } = req.body
  const { originalname: picName, url: picPath } = req.file
  const getPost = await Post.findByIdAndUpdate({ _id: id }, { $push: { comments: { creator: req.session.currentUser._id, comment, picName, picPath } } })
  res.redirect('/')
})


router.get('/private', isLoggedIn, (req, res) => {
  res.render('private')
});

module.exports = router;
