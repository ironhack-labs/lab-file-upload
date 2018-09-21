const express = require('express');
const router  = express.Router();
const Post = require('../models/posts')
const User = require('../models/user')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});



module.exports = router;
