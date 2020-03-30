const express = require('express');
// const passport = require('passport');
const post = require('../models/post.model');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

var multer = require('multer') //SH

var storage = multer.diskStorage({  // multer config specifies where to save the file & file name
  destination: function (req, file, cb) {
  cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
  cb(null, `${Date.now()}.${file.mimetype.replace('image/','')}`)
  }
  })
  
var upload = multer({ storage: storage }) //SH

router.get('/create', ensureLoggedIn('/login'), (req, res) => { //SH
  res.render('posts/create'
  );
});

router.get('/all', (req, res) => { //SH
  post.find({},(err,posts)=>{
    res.render('posts/all',{posts})
})
});

router.post('/create', ensureLoggedIn('/login'), upload.single('image'), (req, res) => { 
  const {filename:picPath} = req.file;

const body = {...req.body,picPath, creatorId:req.user._id}; // creating content body to save in the post

post.create(body,function(err,post){
if(err) {res.json(err); return;}
res.redirect('/posts/create');
})
  
});

router.get('/view/:id',(req,res,next)=>{  // rendering posts details page
  post.findOne({_id:req.params.id},(err,post)=>{
      if(err){
          res.json(err); return;
      }
      res.render('posts/detail',post);
  })
})

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
