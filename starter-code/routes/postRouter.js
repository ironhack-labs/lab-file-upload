const express    = require('express');
const passport   = require('passport');
const postRouter     = express.Router();
const multer  = require('multer');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Post = require("../models/post")
const User = require('../models/user');
const uploadHandler = multer({ dest: './public/uploads/' });

/* GET home page */
postRouter.get('/', ensureLoggedIn(),(req, res, next) => {
    res.render('post/index');
  });

  // GET index
postRouter.get("/", (req, res, next) => {
    Post.find()
    .then( data => {
      res.render("post/index", {data})
    })
  })
  

  /* RENDER NEW FORM */
postRouter.get('/new', (req, res, next) => {
    res.render("post/new");
  });

// POST new
postRouter.post("/new", [ensureLoggedIn(), uploadHandler.single("photo")], (req, res, next) => {
    const { content } = req.body;
    const picPath = req.file.path;
    const picName = req.file.filename;
  
    const creatorId = req.user.id;
  
    const newPost = new Post({
      content,
      picPath,
      picName,
      creatorId
    });

    newPost.save () 
    .then (() => {
        res.redirect("/post");
    })
    
    .catch((err) => {
        console.log(err);
        next(err);
      });
  
   
  })
    


module.exports = postRouter;