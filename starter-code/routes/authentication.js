const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });
const uploadCloud = require("../config/cloudinary.js");
const Post = require("../models/post");
const Comments = require("../models/comments");

router.get("/login", ensureLoggedOut(), (req, res) => {
  res.render("authentication/login", { message: req.flash("error") });
});

router.post(
  "/login",
  ensureLoggedOut(),
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.get("/signup", ensureLoggedOut(), (req, res) => {
  res.render("authentication/signup", { message: req.flash("error") });
});

router.post(
  "/signup",
  [ensureLoggedOut(), uploadCloud.single("photo")],
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
  res.render("authentication/profile", {
    user: req.user
  });
});

router.get("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

router.post("/create", uploadCloud.single("photo"), (req, res) => {
  //console.log("hola",req.body.content, req.user.id);

  const post = new Post({
    content: req.body.content,
    creatorId: req.user.id,
    picPath: req.file.url,
    picName: req.file.originalname
  });

  post.save(err => {
    if (err) {
      next(null, false, { message: Post.errors });
    }
  });
});

router.get("/new", (req, res) => {
  res.render("new");
});

router.get("/my-posts", (req, res) => {
  
  Post.find({ creatorId: req.user.id })
    .populate('comments')
    .then(posts =>{
    
        res.render("myPosts", { posts });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/new-comment",uploadCloud.single("photo"), (req, res) => {
  var comment = new Comments({
    content: req.body.comment,
    authorId: req.user.id,
    post: req.body.postId,
    imagePath:  req.file.url,
    imageName:  req.file.originalname,
  });

  comment.save()
    .then(comment => {
      return Post.findByIdAndUpdate(comment.post,{$push:{comments:comment._id}})
    })
    .then(() => {
        res.redirect('/my-posts');
    })
    .catch(err => console.log(err));
});

router.get("/comments/:id", (req, res) => {
   var postId = req.params.id;

   Comments.find({post:postId})
    .then(comments=>{
        res.render('',{comments})
    })
    .catch(err=>{console.log(err)})

});



router.get("/view-all", (req, res) => {});

module.exports = router;
