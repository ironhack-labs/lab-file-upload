const express = require('express');
const router  = express.Router();
const User = require('../models/user.js')
const uploadCloud = require('../config/cloudinary.js');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
  User.find()
  .then((user) => {
    res.render('index', { user });
  })
  .catch((error) => {
    console.log(error);
  })
});

module.exports = router;
