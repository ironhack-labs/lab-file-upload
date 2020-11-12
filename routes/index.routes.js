const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getDetail } = require('../controllers/controllers')

/* GET home page */
router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));

//-------Create Posts
router.get ('/post/create', (req, res) => res.render('post-form'))
router.post ('/post/create', createPost)
 //-------Post List
 router.get ('/posts', (req, res) => res.render('post-list'))
 router.post ('/posts', getAllPosts)
//-------Post Detail
router.get ("/posts/:id", (req, res) => res.render('post-detail'))
router.post("/posts/:id", getDetail)

module.exports = router;
