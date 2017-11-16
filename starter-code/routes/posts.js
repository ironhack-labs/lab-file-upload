const express = require('express');
const router  = express.Router();
const Post = require('../models/post');
const Commentary = require('../models/commentary');
const mongoose = require ('mongoose');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const bodyParser = require('body-parser').json();

router.get('/', (req, res, next) => {
  let userLogged = req.user;
  Post.find({},"creatorId content pic_path")
    .populate('creatorId')
    .exec()
    .then((result) => {
      console.log(result);
      res.render('index', { result , userLogged});
    })
    .catch(()=> console.log("Error finding"));
});

router.get('/create',ensureAuthenticated, (req, res, next) => { // New post

  res.render('posts/create');

});

router.post('/create', ensureAuthenticated,upload.single('photo'),(req, res) => {

  let newPost = new Post({
      content: req.body.content,
      creatorId: req.user,
      pic_path: `/uploads/${req.file.filename}`,
      pic_name: req.file.originalname
    });

  newPost.save().then(() => res.redirect('/showOwn')).catch(() => console.log('Error saving!'));

});

router.get('/showOwn', ensureAuthenticated,(req, res, next) => { // Show post complete

  Post.find({ creatorId: req.user }, "id content pic_path")
    .exec()
    .then((result) => res.render('posts/showOwn', { result }))
    .catch(()=> console.log("Error finding"));

});

router.get('/:id/edit', ensureAuthenticated,(req, res, next) => { // Edit own post
  let userLogged = req.user;
  console.log(userLogged);
  Post.findById(req.params.id, "content pic_path creatorId")
    .exec()
    .then((result) => res.render('posts/edit', {result, userLogged}))
    .catch(() => console.log("ERROR"))

});

router.post('/:id/edit', ensureAuthenticated, upload.single('photo'), (req, res, next) => { // Edit own post

  let modPost = {
    content: req.body.content,
  }
  if (req.file){
    modPost['pic_path'] = `/uploads/${req.file.filename}`;
    modPost['pic_name'] = req.file.originalname;
  }
  Post.findByIdAndUpdate(req.params.id, modPost)
    .then(() => console.log("Edited!"))
    .then(() => res.redirect('/showOwn'))
    .catch(() => console.log('There was an error editing'))
});

router.get('/:id/show', (req,res) =>{
  let userLogged = req.user;
  Post.findById(req.params.id, "content pic_path")
    .exec()
    .then((postResult) => {
        Commentary.find({ postId: req.params.id }, "content authorId imagePath")
        .exec()
        .then((commentResult) => res.render('posts/show', { postResult, commentResult, userLogged }))
        .catch(()=> console.log("Error finding"));
      })
    .catch(() => console.log("ERROR"))

});

router.post('/:id/delete', (req, res) =>{

  Post.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/showOwn')
    .catch(() => console.log('Error deleting')))

});

router.post('/:id/addCommentary', ensureAuthenticated, upload.single('photo'),(req, res) =>{
  let newComment = new Commentary({
      content: req.body.contentComment,
      authorId: req.user,
      postId: req.params.id
    });
  if (req.file){
    newComment['imagePath'] = `/uploads/${req.file.filename}`;
    newComment['imageName'] = req.file.originalname;
  }
  newComment.save().then(() => res.redirect(`/${req.params.id}/show`)).catch(() => console.log('Error saving!'));

});

function ensureAuthenticated(req, res, next) {

  console.log(req.params.id,req.user);
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }

}
module.exports = router;
