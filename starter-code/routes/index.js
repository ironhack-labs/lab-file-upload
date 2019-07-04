const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

/* GET home page */
router.get("/", (req, res, next) => {
  Post.find().then(posted => {
    res.render("index",{post:posted})
   } ) 
});

router.get("/auth/profile", (req, res, next) => {
  res.render("auth/profile", { user: req.user });
});

router.post("/auth/newpost", (req, res, next) => {
  const author = req.user.username;
  const content = req.body.postText;
  console.log(author)
  console.log(content)
  // const image = req.file.url
  const newPost = new Post({
    content: content,
    creatorID: author
    // image
  });

  newPost
    .save()
    .then(() => {
      res.redirect(`/postDetails/${newPost._id}`);
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    });
});

router.get("/postDetails/:id", (req, res, next) => {
  Post.findById(req.params.id).then(posted => {
    res.render("post",{post:posted})
  });
});
//   res.render("post",{_id: req.params._id})
// })}




module.exports = router;