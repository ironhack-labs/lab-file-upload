const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const multer     = require('multer')
const upload   = multer ({dest:'./public/pics'})
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});
router.get('/new',ensureLoggedIn('/login'),(req,res,next)=>{
    res.render('new')
})
router.post('/new',upload.single('photo'),(req,res,next)=>{
    console.log(req.file)
    const post = new Post({
        content: req.body.content,
        picPath: `/pics/${req.file.filename}`,
        picName: req.file.originalname,
        creatorId: req.user._id
      });
    Post.create(post)
    .then(post=>{
        res.redirect('/index')
    })

})
router.get('/index',(req,res,next)=>{
    var arreglo = []
    Post.find()
    .then(posts=>{
       
        res.render('list',{posts})
    }).catch(e=>console.log(e))
    
})

router.get('/comment/:id',ensureLoggedIn('/login'),(req,res,next)=>{
    const {id} = req.params
    const action = `/comment/${id}`
    console.log(id)
    res.render('comment',{action})
})
router.post('/comment/:id',upload.single('photo'),(req,res,next)=>{
    const {id} = req.params
    const comment = new Comment({
        content: req.body.content,
        imagePath: `/pics/${req.file.filename}`,
        imageName: req.file.originalname,
        authorId: req.user._id
      });
    Comment.create(comment)
    .then(comment=>{
        Post.findByIdAndUpdate(id,{$push:{commentId:comment._id}})
        .then(post=>{
            res.redirect(`/detail/${post._id}`)
          }).catch(e=>next(e))
          
        }).catch(error=>{
          console.log(error)
        })
    

})
router.get('/detail/:id',(req,res,next)=>{
    const {id} = req.params
    Post.findById(id).populate('commentId')
  .then(post=>{
    res.render('detail',post)
  }).catch(e=>next(e))

})

module.exports = router;