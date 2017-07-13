const express  = require('express');
const multer   = require('multer');
const router   = express.Router();
const User     = require('../models/user.js');
const Post     = require('../models/post.js');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const upload = multer({ dest: './public/uploads/' });
const passport   = require('passport');


router.get('/',(req, res, next) => {
    console.log('estoy aqui');
    res.render('/post/newpost');
  }
);

module.exports = router;
