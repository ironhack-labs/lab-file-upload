const express = require("express");
const router = express.Router();
const postModel = require("../models/post");
const cloudinary = require("../options/cloudinary");

router.get("/", (req, res, next) => {
  postModel
    .find({}, {_id: 0}) //find({}, {name:2, _id:0}) zuerst, was er sucht, und dann die Projektion (wie in compass)
    .then(posts => res.render("posts/list-post", { posts })) // {post} ist, was wir ihm in handebars geben
    .catch(err => console.log("An error ocurred finding post", err));
});

router.get("/add", (req, res, next) => {
  res.render("posts/add-post");
});

router.post("/add", cloudinary.single("photo"), (req, res, next) => {
  //cloudinary se encarga del middleware, das das Foto zerstückelt (enctype="multipart/form-data)
  const newPost = new postModel({
    content: req.body.content,
    creatorId: req.user._id, // user, me lo da el usuario y es así por passport
    picPath: req.file.secure_url,
    picName: req.file.originalname
  });
  newPost
    .save()
    .then(() => res.redirect("/posts/")) // cuidado!
    .catch(err => console.log("An error ocurred saving a post in db"));
});

module.exports = router;
