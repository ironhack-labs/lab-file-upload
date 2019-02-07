const express    = require('express');
const router     = express.Router();
const postModel = require('../models/post')
const commentModel = require('../models/comment')
const cloudinary = require('../options/cloudinary')

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get('/', (req,res,next)=> {
  postModel.find({})
    .populate('comments')
    .then(posts => res.render('posts/list-post', {posts}))
    .catch(err => console.log(`${err} has ocurred`))
})

router.get('/add', ensureLoggedIn('/login'),(req, res, next)=> {
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

router.post('/add-comment/:id', cloudinary.single('photo'), (req, res, next) => {
  const newComment = new commentModel({
    content: req.body.content,
    authorId: req.user._id,
    picPath: req.file.secure_url,
    picName: req.file.originalname,
  })
  newComment.save()
  .then(comment =>{
    postModel.findByIdAndUpdate(req.params.id, {$push: {comments: comment._id}})
    .then(()=> {console.log('A comment was saved succesfully'); res.redirect('/posts/')})
    .catch(err=> console.log('An error has ocurred while referring the comment'))
  })
  .catch(err=> console.log('An error has ocurred while saving the comment'))
})
  

module.exports = router