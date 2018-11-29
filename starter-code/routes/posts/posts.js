const express = require('express');
const router  = express.Router();
const Post = require('../../models/Post')
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
  Post.find()
  .then(posts=>{
    res.render('posts/list',{posts})
  })
  .catch(err=>{
    console.log(err)
  })
});

router.post('/new', checkIfLogged, uploader.single('image'), (req, res, next) => {
  console.log(req.file)
  const p = {
    content:req.body.content,
    picName:req.file.originalname
  }
  // if(req.file) r.image = 'http://localhost:3000/pics/' + req.file.filename
  // Post.create(p)
  // .then(post=>{
  //   res.json(post)
  //   // res.redirect('/posts/')
  // })
})

router.get('/new', checkIfLogged, (req, res, next) => {
  res.render('posts/new')
});

module.exports = router;