const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
const upload = require("../helpers/multer.js");
const uploadPostPicture = upload.uploadPostPicture;
const uploadCommentPicture = upload.uploadCommentPicture;

const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

/* GET home page. */
router.get("/new", ensureLoggedIn("/login"), (req, res) => {
  res.render("post/new", { user: req.user });
});

router.post("/uploadPost", uploadPostPicture.single("postPic"), (req, res) => {
  const picPath = req.file.url;
  const content = req.body.content;
  const creatorId = req.user;
  const picName = req.file.originalname;

  Post.create({ picPath, content, creatorId, picName }).then(() => {
    res.redirect("/");
  });
});

router.get("/show/:id", ensureLoggedIn("/login"), (req, res) => {
  let postId = req.params.id;
  Post.findById(postId).then(post => {
    res.render("post/show", { post, user: req.user });
  });
});

router.post(
  "/uploadComment",
  uploadCommentPicture.single("commentPic"),
  (req, res) => {
    let file = req.file;
    if (file == undefined) {
      var imagePath = null;
      var imageName = null;
    } else {
      imagePath = req.file.url;
      imageName = req.file.originalname;
    }

    let content = req.body.comment;
    let authorId = req.user;
    let postId = req.body.postId;

    Comment.create({ imagePath, content, authorId, imageName }).then(
      comment => {
        
        Post.findByIdAndUpdate(postId,{$push:{comments:comment}})
        .then(() => {
          console.log(`Se ha creador el comentario`);
          res.redirect(`/show/${postId}`);
        });

      }
    );
  }
);

module.exports = router;