const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const User = require('../models/user');
const Post = require('../models/post');



/* GET home page. */
router.get('/', (req, res, next) => {
  User
  .findById(req.session.passport.user)
  .then(myInfo=>{
    res.render('index', { myInfo,title: 'Express - Generated with IronGenerator' });

  })
});


module.exports = router;
