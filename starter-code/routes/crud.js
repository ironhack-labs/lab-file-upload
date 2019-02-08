const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const multer  = require('multer');
const Picture = require("../models/user")
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const mongoose = require('mongoose');
const Post = require("../models/post");



const upload = multer({ dest: './public/uploads/' });

router.get('/create',ensureLoggedIn(),(req,res,next)=>{

res.render('crud/create')
})

router.post('/create',upload.single('photo'),(req,res,next)=>{

  const id = req.body.creatorid
  const content = req.body.content
  const path = `/uploads/${req.file.filename}`
  const picName = req.file.originalname

  const post = {
    content: content,
    creatorId: id,
    picPath: path,
    picName: picName
  }



  Post.create(post)
  .then((data)=>{

    res.redirect('/')

  })
  .catch((err)=>{

    console.log(err)

  })

  console.log(id)
})



module.exports = router;