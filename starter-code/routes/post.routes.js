const express    = require('express');
const router     = express.Router();

const User = require('../models/user')
const Post = require('../models/Post.model')

router.get('/new', (req, res, nex) => res.render('posts/new'))

router.get('/create', (rerq, res, next) => res.render('posts/create'))

router.get('/show', (rerq, res, next) => res.render('posts/show'))


module.exports = router;