const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/comment' });
const Comment = require('../models/comments');

router.get('/comment/post/:id', (req, res, next) => {
  let postId = req.params.id;

  Comment.find({'postId': postId}, (error, comments) => {
    if (error) {return next(error); }
    return res.render('comment/show', {comments});
  });
});

router.post('/comment/create', upload.single('photo'), (req, res, next) => {
  console.log("Dentro de create", req.body.postId)
  const newComment = new Comment({
    authorId: req.user.id,
    postId: req.body.postId,
    content: req.body.content,
    picPath: `/uploads/post/${req.file.filename}`,
    picName: req.file.originalname
  });

  newComment.save((error) => {
    if (error) { return next(error); }
    return res.redirect('/post/index');
  });
});

router.get('/comment/create/:id', (req, res, next) => {
  let postId = req.params.id;
  res.render('comment/new', {postId});
});

module.exports = router;
