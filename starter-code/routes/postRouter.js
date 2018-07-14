const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

const Post = require('../models/post');

router.get('/create', ensureLoggedIn(),(req, res, next) => {
    res.render('posts/create');
})

router.post('/create', [ensureLoggedIn(), upload.single('picture')], (req, res, next) => {
    const {content} = req.body;

    const newPost = new Post({
        content,
        creatorId: req.user._id,
        picture: {
            path: `/uploads/${req.file.filename}`,
            originalName: req.file.originalname
        }
    })

    newPost.save()
    .then(data => res.redirect('/'))
    .catch(err => next())
})

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id)
    .populate('creatorId')
    .populate({
        path: 'comments',
        populate: {
            path: 'authorId'
        }
    })
    .then(post => {
      res.render('posts/show', {post})
    })
})

module.exports = router;