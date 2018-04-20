const express = require("express");
const passport = require("passport");
const uploadCloud = require("../config/cloudinary");
const Post = require("../models/post");
const picture = require("../models/pictures");
const multer = require("multer");
const router = express.Router();

router.get("/posts/new", (req, res, next) => {
  const userId = req.session.passport.user;
  const imgPath = "";
  if (userId) {
    if (userId.profileImg) {
      imgPath = userId.profileImg.path;
    }
  }
  let userData = {
    userId,
    imgPath
  };

  res.render("posts/new", { userData });
});

router.get("/posts/show", (req, res, next) => {
  res.redirect("/");
});

const upload = multer({ dest: process.env.CLOUDINARY_URL });

router.post("/posts/new",  uploadCloud.single("photo"), function (req, res) {

  let picPath = "";
  let picName = "";

  let date = new Date();

  if(req.file !== undefined){
    const pic = new picture({
      name: date,
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname
    });

    pic
    .save().then(() => {
      console.log("Image saved");
    })

    picPath = pic.path;
    picName = pic.name;
  }


  const post = new Post({

    creatorId: req.session.passport.user,
    picPath,
    picName,
    content: req.body.content
  });

  post.save().then(() => {
    console.log("Post saved");
    res.redirect("/posts/new");
  })

});

module.exports = router;
