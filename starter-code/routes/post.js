const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const multer = require('multer')
const Post = require('../models/Post')
const upload = multer({dest:'.public/uploads/'})
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/add',ensureLoggedIn('/login'),(req,res,next)=>{
  res.render('addpost')
})

router.post('/add',ensureLoggedIn('/login'),upload.single('photo'),(req,res,next)=>{
  console.log(req.file)
  const newPost = {
    content : req.body.content,
    creatorId : req.session._id,
    picture : {
      pic_path: `/uploads/${req.file.filename}`,
      pic_name : req.file.originalname
    }
  }

  new Post(newPost)
  .save()
  .then(()=> {
    console.log("success")
    res.redirect("/")
  })
  .catch((err)=>console.log(err))
})

module.exports = router;
