const express = require('express');
const router = express.Router();
const Post = require('../models/post.model')
/* GET home page. */
//router.get('/', (req, res) => res.render('index', { title: 'Express - Generated with IronGenerator' }));


router.get('/', (req, res, next) => {

    Post.find()
        .then(allPost => {
            res.render('index', { allPost })
        })
        .catch(err => next(err))
});

module.exports = router;
