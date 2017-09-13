const express     = require('express');
const passport    = require('passport');
const router      = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer      = require('multer');
const Post        = require( '../models/Post' );

var upload        = multer({ dest: './public/uploads/' });


router.get('/', (req, res) => {
  Post.find((err, posts)=>{
    if(err){
      res.redirect('/posts');
    }
    res.render('posts/index', { posts });
  });
});

router.get('/show', (req, res) => {
    res.render('posts/show', { message: req.flash('error')});
});

router.get('/new', ensureLoggedIn(), (req, res) => {
    res.render('posts/new', { message: req.flash('error')});
});

router.get('/new', (req, res) => {
    res.redirect('/login');
});

router.post('/new', ensureLoggedIn(), upload.single('photo'), (req, res) => {
  let { content, picName} = req.body;
  console.log(req.file.filename);
  let postObj = {
    content,
    creatorId : req.user._id,
    picPath: req.file.filename,
    picName
  };
  let newPost = Post(postObj);
  newPost.save((err)=>{
    if(err){ next(null, false, { message: newUser.errors }); }
    res.redirect('/posts');
  });
});

module.exports = router;
