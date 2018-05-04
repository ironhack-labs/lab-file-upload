const express = require('express');
const router  = express.Router();
const multer = require("multer");
const uploadPost = multer({dest: "./public/postPics/"});
const Post = require("../models/post")


router.get("/new",(req,res,next)=>{
  res.send("hackberto")
})

router.get("/show",(req,res,next)=>{
  res.send("hackberto")
})

router.get("/create",(req,res,next)=>{
  res.render("create")
})

router.post("/create",uploadPost.single("picPath"),(req,res,next)=>{
  req.body.picPath = ("./public/postPics/" + req.file.filename)
  Post.create(req.body)
  .then(r=>res.redirect("/new"))
  .catch(e=>console.log(e))
})


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

module.exports = router;
