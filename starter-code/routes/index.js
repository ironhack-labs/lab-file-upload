const express = require('express');
const router  = express.Router();
const User = require("../models/user");
const Post = require('../models/post');

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.session)
  User
    .findById(req.session.passport.user)
    .then(myInfo => {
      res.render('index', { myInfo, title: 'Express - Generated with IronGenerator' });
    })
  
});

module.exports = router;
