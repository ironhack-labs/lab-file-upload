const express = require("express");
const router = express.Router();
const postModel = require("../models/post");
const cloudinary = require("../options/cloudinary");
const commentModel = require("../models/comment");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get("/", (req, res, next) => {
  postModel
    .find({}) //find({}, {name:2, _id:0}) zuerst, was er sucht, und dann die Projektion (wie in compass)
    .populate("comments") // key aus dem Schema!!
    .then(posts => res.render("posts/list-post", { posts })) // {post} ist, was wir ihm in handebars geben
    .catch(err => console.log("An error ocurred finding post", err));
});

router.get("/add", ensureLoggedIn("/login"), (req, res, next) => {
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

router.post(
  "/add-comment/:id",
  cloudinary.single("photo"),
  (req, res, next) => {
    const newComment = new commentModel({
      content: req.body.content,
      authorId: req.user._id, // buena práctica
      imagePath: req.file.secure_url,
      imageName: req.file.originalname
    });
    newComment
      .save()
      .then(comment => {
        postModel
          .findByIdAndUpdate(req.params.id, {
            $push: { comments: comment._id } //hacemos push y actualizamos la colección de post. El lenguaje que usamos es el de mongo
          })
          .then(() => {
            console.log("A comment was saved succesfully");
            res.redirect("/posts/");
          })
          .catch(err => console.log("An error ocurred refering a comment"));
      })
      .catch(err => console.log("An error ocurred saving a comment in db"));
  }
);

module.exports = router;
