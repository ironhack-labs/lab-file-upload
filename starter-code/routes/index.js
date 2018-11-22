const express = require('express');
const router  = express.Router();
const User = require('../models/user.js');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

router.get('comment/add'), (req,res) =>{
  res.render("comment")
} 

module.exports = router;
