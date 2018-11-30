const express = require('express');
const router  = express.Router();
const Post = require('../../models/Post')
const User = require('../models/User')
const multer = require('multer')
const uploader = multer({dest: './public/pics'})

function checkIfLogged(req, res, next){
  // if(req.isAuthenticated()){
  //   return next()
  // }
  // return res.redirect("/auth/login")
  return next()
}

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find().populate('creatorId')
  .then(posts=>{
    res.render('posts/list',{posts})
  })
  .catch(err=>{
    console.log(err)
  })
});

router.post('/new', checkIfLogged, uploader.single('image'), (req, res, next) => {
  // console.log(req.file)
  // console.log(req.user)
  if(req.file){
    const p = {
      content:req.body.content,
      creatorId:"5c0081ff76e399a7120694db",
      picPath: '/pics/' + req.file.filename,
      picName:req.file.originalname
    }
    Post.create(p)
    .then(post=>{
      // res.json(post)
      res.redirect('/posts')
    })
    .catch(err=>{
      console.log(err)
    })
  } 
})

router.get('/new', checkIfLogged, (req, res, next) => {
  res.render('posts/new')
});

module.exports = router;