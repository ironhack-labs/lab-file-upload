const express = require('express');
const router  = express.Router();
var multer  = require('multer');
const Picture = require('../models/pictures');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

module.exports = router;
