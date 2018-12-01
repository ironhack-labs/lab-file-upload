const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { isLoggedIn, isLoggedOut } = require("../middlewares/IsLogged");

router.get("/newpost", isLoggedIn(), (req, res, next) => {
  res.render("post/new");
});

router.get("/viewpost" ,isLoggedIn(),(req,res,next)=>{
    Post.find().then(post=>{
        console.log(post)
        res.render("post/view",{post})
    })
})

router.get("/:id",isLoggedIn(),(req,res,next)=>{
    
    Post.findById(req.params.id).then(post=>{
        User.findById(post.creatorId).then(user=>{
            res.render("post/post",{post,user})
        })
        
    })
})


router.post("/newpost", isLoggedIn(), (req, res, next) => {
  const { content, picName } = req.body;
  console.log(picName)
  if (content == "" || picName == "") {
    return res.redirect("/post/newpost");
  }
  Post.create({
    content,
    picName,
    creatorId: req.user._id,
    picPath: req.user.photo
  })
    .then(() => res.redirect("/"))
    .catch(e => console.log("ERROR", e));
});

module.exports = router;
