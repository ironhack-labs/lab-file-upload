const express = require('express');
const postRouter = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../config/cloudinary.js');
const Post = require('../models/Post');
const Comment = require('../models/Comment');



postRouter.get('/new', ensureLoggedIn(), (req, res) => {
  res.render('post/new', { message: req.flash('error') });
});

postRouter.post('/new', [ensureLoggedIn(), uploadCloud.single('img')], (req, res, next) => {
  let creatorId = req.user.id;

  const {
    content,
    picName
  } = req.body;

  let picPath = req.file.url;
  const newPost = new Post({
    content,
    picName,
    creatorId,
    picPath
  });

  newPost.save((err) => {
    if (err) { next(null, false, { message: newPost.errors }) }
    return next(null, newPost);
  });

  res.redirect('../');

})
postRouter.get('/:id/newComment', ensureLoggedIn(), (req, res, next) => {
  res.render('comment/new', { postId: req.params.id });
})

postRouter.post('/:id/newComment', [ensureLoggedIn(), uploadCloud.single('img')], (req, res, next) => {
  let authorId = req.user.id;
  let postId = req.params.id;

  const {
    content,
    imageName
  } = req.body;

  let imagePath = req.file.url;
  const newComment = new Comment({
    content,
    imageName,
    authorId,
    imagePath,
    postId
  });

  newComment.save((err) => {
    if (err) { next(null, false, { message: newComment.errors }) }
    return next(null, newComment);
  });

  res.redirect(`/post/${postId}`);


})

postRouter.get('/:id', (req, res) => {
  console.log(req.params.id);
  Post.findById(req.params.id)
    .populate("creatorId", "username")
    .then((post) => {
      Comment.find({ postId: req.params.id })
        .populate("authorId", "username")
        .then((comments) => {
          res.render('post/show', { post, comments });
        }
        )
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});




module.exports = postRouter;
