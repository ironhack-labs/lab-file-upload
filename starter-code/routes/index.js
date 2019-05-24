const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer  = require('multer');
const upload = multer({ dest: '../public/uploads/' });
const uploadCloudinary = require("../config/cloudinary");
const Post = require('../models/post');
const Comment = require('../models/comment');

/* GET home page. */
router.get('/', (req, res) => {
  Post.find()
      .then(posts => {
        Comment.find()
        .then(comments => {
          res.render('index', {posts, comments })
        })
        .catch(err => console.log('Error!:', err))
      })
      .catch(err => console.log('Error!:', err))
})


module.exports = router;
