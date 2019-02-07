const express    = require('express');
const router     = express.Router();
const postModel = require('../models/post')
const cloudinary = require('../options/cloudinary')


router.get('/', (req,res,next)=> {
  postModel.find({}, {_id:0})
    .then(posts => res.render('posts/list-post', {posts}))
    .catch(err => console.log(`${err} has ocurred`))
})

router.get('/add', (req, res, next)=> {
  res.render('posts/add-post')
})

router.post('/add', cloudinary.single('photo'), (req, res, next) =>{
  const newPost = new postModel({
    content: req.body.content,
    creatorId: req.user._id,
    picPath: req.file.secure_url,
    picName: req.file.originalname,
  })
  newPost.save()
  .then(()=>{
    res.redirect('/posts/')
  })
  .catch( err => console.log(`An ${err} has ocurred while uploading your post to the db`))
})

module.exports = router