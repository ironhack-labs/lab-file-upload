const express    = require('express');
const passport   = require('passport');
const postrouter     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const path = require('path');
const Post       = require('../models/posts.js');
const Comment = require('../models/comments.js');

const myUploader = multer({ dest: path.join(__dirname, '../public/uploads' ) });


postrouter.get('/posts/new', ensureLoggedIn('/login'), (req, res, next) => {
    res.render('posts/new-post.ejs');
});

postrouter.post('/posts/new',
ensureLoggedIn('/login'),
myUploader.single('postPicPath'),
(req, res, next) => {
    const newPost = new Post({
        content: req.body.postContent,
        creatorId: req.user._id,
        picPath: `/uploads/${req.file.filename}`,
        picName: req.body.postPicName
    });

    newPost.save((err) => {
        if(err) {
            next(err);
            return;
        }
        res.redirect('/');
    });

});

postrouter.get('/posts/index', (req, res, next) => {
    Post.find( {}, (err, postList) => {
        if(err) {
            next(err);
            return;
        }

        res.render('posts/index.ejs', {
            posts: postList
        });
    });
});

postrouter.get('/posts/:id/addcomment',
    ensureLoggedIn(),
    (req, res, next) => {
        const postID = req.params.id;

  Post.findById(postID, (err, aPost) => {
    if(err){
      next(err);
      return;
    }
    res.render('posts/add-comment.ejs', {
      post: aPost
    });
  });
});

postrouter.post('/posts/:id/addcomment',
    ensureLoggedIn(),
    myUploader.single('commentImagePath'),
    (req, res, next) => {
    const postID = req.params.id;
    const addcomment = new Comment({
        content: req.body.postComment,
        authorId: req.user._id,
        imagePath: `/uploads/${req.file.filename}`,
        imageName: req.body.commentImageName
    });

    Post.findOneAndUpdate(
        postID,
        {$push: { comments: addcomment }},
            (err, thepost) => {
                if (err) {
                    next(err);
                    return;
                }
                thepost.save((err) => {
                    if(err) {
                        next(err);
                        return;
                    }
                  res.redirect('/posts/index');
              });
         });
      });

module.exports = postrouter;
