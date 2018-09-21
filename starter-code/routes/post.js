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
    Post.findById(req.params.postId).populate('creatorId').populate('comments.authorId').then(post => {
        Commen.find().populate('authorId')
        console.log(post)
        return post;
    })
    .then(post => {
        res.render('post/show', {post})
    }).catch(e => console.log(e))
    
})

//CREATE COMMENT
router.post('/new/:postId',[ensureLoggedIn('/login'), upload.single('photo')], (req, res, next) => {
    let imagePath;
    let imageName;
    if (req.file){
        imagePath = `/uploads/${req.file.filename}`;
        imageName = req.file.filename;
    } /* else {
        imagePath = '';
        imageName = '';
    } */
    let content = req.body.texto;
    let authorId = req.user._id;
    
    let comment = {content, authorId, imagePath, imageName};
    Post.findByIdAndUpdate(req.params.postId, {$push: { comments: comment }}
    , { 'new': true}).populate('creatorId').then( (post) => {
        console.log("Comment Created");
        Commen.find().populate('authorId');
        let stringId = encodeURIComponent(post._id);
        res.redirect('/post/'+stringId);
      })
      .catch(e => next(e))
})
    


module.exports = router;
