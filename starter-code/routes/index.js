const express = require('express');
const router  = express.Router();
const multer = require("multer");
const upload = multer({ dest: './public/uploads/' });
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const passport = require("passport");
const Post = require("../models/post");
const User = require("../models/user");
/* GET home page. */
router.get('/', (req, res, next) => {

  res.render('index', {user:req.user});
});


// router.post('/upload', uploadHandler.single('photo'), (req, res, next) => {
  
//   console.log(req.file.filename);
//   console.log(req.user);
//   res.redirect('/')
// });

router.post("/posts", [ensureLoggedIn(), upload.single("photo")],(req,res,next) => {

  const {content} = req.body;
  const {id} = req.user;
  console.log(req.user.id)
  const {originalname, path } = req.user.photo;
  console.log(Post.db);
  newPost = new Post({
    creatorID:id,
    content,
    path,
    originalname
  })
  newPost.save(err => {
    if(err){
      console.log(err)
      next(err)
    }
    res.redirect("/");
  })
})
router.get("/comments",(req, res) => {
  
  res.render("comments", {user:req.user})
})
module.exports = router;
