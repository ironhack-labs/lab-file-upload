const express = require('express');
const router  = express.Router();
const Post    = require('../models/Post');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

module.exports = router;
