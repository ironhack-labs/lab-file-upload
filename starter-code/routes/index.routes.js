const express = require('express');
const router = express.Router();
const Post = require('../models/Post.model')

/* GET home page. */

router.get('/', (req, res) => {

    Post.find()
        .then((allPosts) => res.render('index', { allPosts }))
        .catch((err) => console.log('No se encontraron posts', err))
})

console.log('hola')
module.exports = router;