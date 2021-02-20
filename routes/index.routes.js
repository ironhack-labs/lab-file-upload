const express = require('express');
const router = express.Router();
const Post = require('../models/Post.model'); // se llama al modelo del post


/* GET home page */
//router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));


router.get('/', (req, res) => {
    Post.find()
        .then((post) => {
            res.render('index', { title: 'App created with Ironhack generator 🚀', post })
        })
});

module.exports = router;