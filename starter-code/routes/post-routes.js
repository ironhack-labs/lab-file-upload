const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');


//show frontpage

//new post

post-routes.get("/new", (req, res, next) => {
    res.render("posts/new", //attention to this route!!
      { username: req.user.username });
    });
    post-routes.post("/new", (req, res, next) => {
      console.log("Working as intended")
      const user  = req.user;
      
      User.findOne({ username: user.username }).exec((err, user) => {
        if (err) { return; }
   
      const newPost = new Post({
        user_id:   user._id,
        username: user.username,
        post:     req.body.postContent
      });
   
      newPost.save((err) => {
        if (err) {
          res.render("posts/new",
            {
              username: user.username,
              errorMessage: err.errors.post.message
            });
        } else {
          res.redirect("/posts");
        }
      });
    });
   });
     
  
   post-routes.use((req, res, next) => {
    if (req.user) { next(); }
    else { res.redirect("/login"); }
   });
  
  
  module.exports = post-routes;
