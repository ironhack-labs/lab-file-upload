const express = require('express');
const router = express.Router();
const routeGuard = require('../configs/route-guard.config');
const fileUploader = require('../configs/cloudinary');
const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');

router.get('/posts/single/:id', async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate('creatorId comments');

  res.render('posts/single', post);
});
router.get('/posts/create', routeGuard, (req, res) => {
  res.render('posts/new');
});
router.post('/posts/create', routeGuard, fileUploader.single('image'), async (req, res) => {
  const { content } = req.body;
  const { path } = req.file;
  await Post.create({
    content,
    creatorId: req.session.currentUser._id,
    picPath: path,
    picName: req.file.originalname
  });
  res.redirect('/');
});

///////////////////////////////////////
//COMMENTS
router.post('/posts/single/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const comments = await Comment.create({ content });
  await Post.findByIdAndUpdate(id, { $push: { comments } }, { new: true });
  res.redirect(`/posts/single/${id}`);
});

module.exports = router;
