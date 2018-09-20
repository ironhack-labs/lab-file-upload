const express = require("express");
const router = express.Router();
const multer = require("multer");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const upload = multer({ dest: "./public/uploads/" });
const Commen = require("../models/commen");
const Post = require("../models/post");

//INDEX
router.get('/', (req, res, next) => {
    console.log("ENTRA GET");
    Post.find().populate('creatorId').then(posts => {
        console.log(posts);
        res.render('index', {posts});
    }).catch(e => console.log(e))
})

//CREATE
router.get('/new', ensureLoggedIn(), (req, res, next) => {
    console.log("ENTRA GET NEW");
    res.render('post/new');
})
router.post('/new', [ensureLoggedIn('/login'), upload.single('photo')], (req, res, next) => {
    console.log("ENTRA POSt NEW");
    let content = req.body.content;
    let creatorId = req.user._id;
    let  picPath = `/uploads/${req.file.filename}`
    let  picName = req.file.filename;

  Post.create({content, creatorId, picPath, picName})
  .then(post => {
    res.redirect('/post');
  }).catch(e =>  next(e))
})


//SHOW
router.get('/:postId', (req, res, next) => {
    console.log(Post)
    Post.findById(req.params.postId)

        .populate({ 
            path: 'creatorId',
            populate: {
              path: 'comments.authorId',
              model: 'Commen'
            } 
         })

    .then(post => {
        res.render('post/show', {post})
    }).catch(e => console.log(e))
    
})

//CREATE COMMENT
router.post('/new/:postId',[ensureLoggedIn('/login'), upload.single('photo')], (req, res, next) => {
    let content = req.body.texto;
    let authorId = req.user._id;
    let imagePath = `/uploads/${req.file.filename}`;
    let imageName = req.file.filename;
    let comment = {content, authorId, imagePath, imageName};
    //comment.populate('authorId');
    Post.findByIdAndUpdate(req.params.postId, {$push: { comments: comment }}
    , { 'new': true}).populate('creatorId').then( (post) => {
        console.log("Comment Created");
        let stringId = encodeURIComponent(post._id);
        res.redirect('/post/'+stringId);
      })
      .catch(e => next(e))
})
    


module.exports = router;
