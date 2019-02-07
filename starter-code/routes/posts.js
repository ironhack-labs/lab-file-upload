const express = require("express");
const router = express.Router();
const postModel = require("../models/post");
const commentModel = require("../models/comment");
const cloudinary = require("../options/cloudinary");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get("/", (req, res, next) => {
  postModel
    .find({}) //hacemos una proyección para que no nos muester el id.
    .populate("comments")
    .then(posts => res.render("posts/list-post", { posts })) //le pasamos todos los posts {posts} y tiene que estar dentro del scope.
    .catch(err => console.log("An error ocurred saving a post in db", err));
});

router.get("/add", ensureLoggedIn("/login"), (req, res, next) => {
  //Solo ponemos add porque ya en el app.js le hemos dicho de donde parte.
  res.render("posts/add-post");
});

router.post("/add", cloudinary.single("photo"), (req, res, next) => {
  //cloudinary es un middleware que coge del formulario enctype.
  const newPost = new postModel({
    content: req.body.content,
    creatorId: req.user._id, //passport me da el usuario y es con user en vez de body.
    picPath: req.file.secure_url,
    picName: req.file.originalname
  });
  newPost
    .save()
    .then(() => res.redirect("/posts/"))
    .catch(err => console.log("An error ocurred saving a post in db"));
});

router.post(
  "/add-comment/:id",
  cloudinary.single("photo"),
  (req, res, next) => {
    const newComment = new commentModel({
      content: req.body.content,
      authorId: req.user._id,
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
          .then(() => {console.log("A comment was saved succesfully")
            res.redirect("/posts/")
            })
          .catch(err => console.log("An error ocurred refering a comment"));
      })
      .catch(err => console.log("An error ocurred saving a comment in db"));
  }
);

module.exports = router;
