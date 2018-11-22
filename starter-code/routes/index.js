const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/post");

const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const uploadCloud = require("../config/cloudinary.js");
mongoose.connect("mondodb://localhost/tumblr-lab-development");
/* GET home page */

router.get("/", (req, res, next) => {
  Post.find({})
    .then(posts => res.render("index", { posts }))
    .catch(err => console.log(err));
});

router.get("/new", ensureLoggedIn(), (req, res, next) => {
  res.render("profile/new");
});

router.post("/new", uploadCloud.single("photo"), (req, res) => {
  const { content, creatorId } = req.body;
  const picPath = req.file.url;
  const picName = req.file.originalname;
  const newPost = new Post({
    content,
    creatorId,
    picPath,
    picName
  });

  newPost
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/index", (req, res) => {
  Post.find({})
    .then(post => res.render("index", { post }))
    .catch(err => next(err));
});

// router.get('/show/:id', (req, res, next) => {
//   Post.findById(req.params.id)
//     .then(post => res.render('show', { post }))
//     .catch(err => next(err));
// });

// router.get('/:id/edit', (req, res, next) => {
//   Post.findById(req.params.id)
//     .then(post => res.render('update', { post }))
//     .catch(err => next(err));
// });

// router.post('/:id', (req, res) => {
//   const { content, creatorId, picPath, picName } = req.body;

//   const newPost = new Post({
//     content,
//     creatorId,
//     picPath,
//     picName
//   });

//   Post.findById(req.params.id)
//     .then((post) => {
//       post.content = req.body.content;
//       post.creatorId = req.body.creatorId;
//       post.picPath = req.body.picPath;
//       post.picName = req.body.picName;
//       post.save()
//         .then(() => {
//           res.redirect('/dashBoard');
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// router.get('/:id/delete', (req, res, next) => {
//   Post.findByIdAndRemove(req.params.id)
//     .then(ppost => res.redirect('/dashBoard'))
//     .catch(err => next(err));
// });

module.exports = router;
