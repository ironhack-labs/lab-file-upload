const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer')
const uploadLocal = multer({ dest: './public/uploads/' })
const Post = require('../models/post.model')

/* GET home page. */
router.get('/', (req, res) => {

    Post.find()
        .populate('creatorId')
        .then(allPosts => res.render('authentication/profile', { allPosts }))
        .catch(err => console.log("Ha habido un error!", err))
})

router.get('/newpost', ensureLoggedIn('/login'), (req, res) => res.render('post/newpost'))
router.post('/newpost', uploadLocal.single('picture'), (req, res, next) => {
    Post.create({
        content: req.body.title,
        creatorId: req.user._id,
        picPath: `/uploads/${req.file.filename}`,
        picName: req.file.originalName
    })
        .then(() => res.redirect("/profile"))
        .catch(err => console.log("Ha habido un error!", err))
})


module.exports = router;
