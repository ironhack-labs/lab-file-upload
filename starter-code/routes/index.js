const express = require('express');
const router  = express.Router();
const Post = require('../models/Post');

//multer
const multer = require('multer');
const upload = multer({dest: './public/assets'});


const cloudinary = require('cloudinary');
const uploadCloud = require('../helpers/cloudinary')
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

router.get('/post',(req,res)=>{
  res.render('posts')
})

router.post('/post',upload.single('photo'),(req,res)=>{
  req.body.photo = '/assets/' + req.file.filename;
  
  Post.create(req.body)
  .then(posts=>{
    // res.send(posts);
      res.render('home',{posts});
      
  })
  .catch(e=>(e))
})
// router.post('/products/new',uploadCloud.array('photos'),(req,res,next)=>{
//   req.body.pics = [];
//   for(file of req.files){
//     req.body.pics.push(file.url)
//   }
  
//   Product.create(req.body)
//     .then(products=>{
//       res.send(products);
//     })
//     .catch(e=>next(e))
// })



module.exports = router;
