const express = require('express');
const router  = express.Router();
const multer= require("multer")
const User               = require('../models/user');
const passport   = require('passport');
const Picture              = require('../models/Picture');
const Post             = require('../models/Post');
const Comment             = require('../models/Comment');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

var upload = multer({ dest: './public/images/' });
/* GET home page. */
router.get('/logout', ensureLoggedIn(), (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/', (req, res, next) => {
  Post.find({}, (err, doc)=>{
    if (req.user!=undefined){
      res.redirect("/index")
    } else {
      if (!doc){
        res.send("No hay nada");
      } else {
        res.render('home', { title: 'Express - Generated with IronGenerator', posts:doc });
      }
    }
  })
});

router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
successRedirect : '/profile',
failureRedirect : '/login',
failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
successRedirect : '/profile',
failureRedirect : '/signup',
failureFlash : true
}));



router.get('/index',ensureLoggedIn(), (req, res, next) => {
  Post.find({}, (err, doc)=>{
    res.render('index', { title: 'Express - Generated with IronGenerator', posts:doc, user:req.user });
  })
});

router.get('/profile', ensureLoggedIn(), (req, res) => {
  User.findById(req.user._id, (error, user) => {
      res.render('authentication/profile', {
          user : user
      });
  })
});

router.post('/profile', upload.single('photo'), function(req, res){

const pic = new Picture({
  name: req.body.name,
  path: `/images/${req.file.filename}`,
  originalName: req.file.originalname
});

pic.save((err) => {
  User.findById(req.user._id, (error, user) => {
      if (error) {
          next(error);
      } else {
          user.profilePic        = pic;
          user.save((error) => {
            if (error) {
                next(error);
            } else {
                res.redirect('/profile');
            }
        })
      }
  })
});
});

router.get("/new",ensureLoggedIn(), (req, res, next) => {
  res.render("posts/new");
});

router.post("/new", upload.single('photo'), (req, res, next) => {
  const pic = new Picture({
    name: req.body.name,
    path: `/images/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save((err) => {
    const post = new Post({
      content: req.body.content,
      creatorId: req.user._id,
      picPath: pic.path,
      picName: pic.name
    })
    post.save((err2) =>{
      if (err2) {
        next(err2);
    } else {
        res.redirect('/index');
    }
    })
  });
});

router.get("/:id", (req, res, next)=>{
  Post.findOne({_id: req.params.id}, (err, doc)=>{
    res.render("posts/show", {post: doc, user: req.user})
  })
})

router.post("/:id", upload.single('photo'),(req, res, next)=>{
  const pic = new Picture({
    name: req.body.name,
    path: `/images/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save((err) => {
    Post.findById(req.params.id, (error, post) => {
        if (error) {
            next(error);
        } else {
            post.picPath       = pic.path;
            post.picName       = pic.name;
            post.content       = req.body.content;
            post.save((error) => {
              if (error) {
                  next(error);
              } else {
                  res.redirect('/index');
              }
          })
        }
    })
  });
})

router.get("/:id/edit", ensureLoggedIn(),(req, res, next)=>{
  Post.findOne({_id: req.params.id}, (err, doc)=>{
    res.render("posts/edit", {post: doc, user: req.user})
  })
})

router.post("/:id/comment", ensureLoggedIn(),(req, res, next)=>{
  Post.findOne({_id: req.params.id}, (err, post)=>{

            const comment = new Comment( {
              content: req.body.content,
              authorId: req.user._id
            })
            let array=post.comments
            array.push(comment)
            post.comments= array;
                post.save((error2)=>{
                  if (error2) {
                    next(error2);
                } else {
                  res.redirect('/'+req.params.id);
                  }
                })
              })
})

module.exports = router;
