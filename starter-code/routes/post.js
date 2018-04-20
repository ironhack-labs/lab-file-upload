const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const multer  = require('multer');
const upload = multer({dest: './public/uploads'})
const Post = require("../models/post");


router.get("/new", ensureLoggedIn(), (req, res) => {
    res.render("post/new");
 
  });
  
  const uploadHandler = multer({ dest: './public/uploads/' });
  router.post("/new", [ensureLoggedIn(), uploadHandler.single('photo')], (req, res, next) => {
const {content} = req.body;
const picPath = req.file.path;
const picName = req.file.filename;
const creatorId = req.user.id;
const newPost = new Post ({
    content,
    picPath,
    picName,
    creatorId
});
newPost.save(err => {
    if (err) {
        next(null, false, { message: newPost.errors })
    }
    return next (null, newPost)
})



  //  res.redirect("post/new");
 
  });

// router.get("/create", ensureLoggedIn(), (req, res) => {

// });

// router.get("/show", ensureLoggedIn(), (req, res) => {
    
// });

// router.get("/index", ensureLoggedIn(), (req, res) => {
    
// })
  
  
  module.exports = router;
  