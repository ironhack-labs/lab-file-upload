const express = require('express');
const router  = express.Router();
const uploader = require('../helpers/multer');
const User = require('../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
  
  const { user } = req;
  res.render('index', { title: 'Express - Generated with IronGenerator', user });

});

module.exports = router;
