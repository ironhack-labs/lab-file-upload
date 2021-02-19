const express = require('express');
const Post = require('../models/Post.model');
const router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  Post.find()
    .then((post) => {
      res.render('index', { title: 'App created with Ironhack generator 🚀', post})  
  })
});

module.exports = router;
