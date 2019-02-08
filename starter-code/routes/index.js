const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const multer  = require('multer');
const Picture = require("../models/user")
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Post = require("../models/post");
const Comment = require("../models/comment")
const upload = multer({ dest: './public/uploads/' });
/* GET home page. */


router.get('/', (req, res, next) => {
  Post.find({})
  .populate('commentaries')
  .then((data)=>{
    res.render('index',{data})
  })
 
  
});

module.exports = router;
