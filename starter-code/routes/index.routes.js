const express = require('express');
const router = express.Router();


const User = require('../models/User.model')
const Post = require('../models/Post.model')

/* GET home page. */
router.get('/', (req, res) => {
    Post.find()
        .then(posts => res.render('index', { posts }))
        .catch(err => console.log(err))
});

module.exports = router;
