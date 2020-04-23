const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const Post = require('../models/Post.model')


/* GET home page. */
router.get('/', (req, res, next) => {
    Post.find()
        .populate('creatorId')
        .then((allPost) => res.render('index', { allPost }))
        .catch(error => next(new Error (error)))
    
})


module.exports = router;
