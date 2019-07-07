const express = require("express");
const router = express.Router();
const { checkLogin } = require("../middlewares");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });

const Post = require("../models/Post");
const Comment = require("../models/Comment");

/* GET home page */
router.get("/", (req, res, next) => {
  Post.find({})
    .populate("_creatorId")
    .then(posts => {
      Comment.find({})
      .populate("_author")
      .then(comments => {
        let newPosts =  posts.map(post => {
          return {
            ...post, 
            _id: post._id,
            comments: comments.filter(comment => comment._post.toString() === post._id.toString())
          }
        })
        res.render("index", { posts: newPosts}); 

      })
      
      
    });
});

router.get("/add-post", (req, res, next) => {
  res.render("add-post");
});

router.post("/add-post", upload.single("picture"), (req, res, next) => {
  const content = req.body.content;
  let picture = " ";
  if (req.file.filename) {
    picture = req.file.filename;
  }
 
  const creator = req.user._id;

  if (!content) {
    res.render("/add-post", {message: "Please fill content"} )
    }

      Post.create({
        content: content,
        picPath: `/uploads/${picture}`,
        _creatorId: creator
      }).then(response => res.redirect("/"));
    
});

router.get("/profile", checkLogin, (req, res, next) => {
  res.render("profile", req.user);
});

//TODO checkLogin middleware
router.post("/add-comment/:postId", (req, res, next) => {

  Comment.create({
    text: req.body.text,
    _post: req.params.postId,
    _author: req.user._id
  }).then(response => res.redirect("/"));

});

module.exports = router;
