const express = require('express');
const User = require('../models/user.js');
const uploadCloud = require('../config/cloudinary.js');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});


module.exports = router;
