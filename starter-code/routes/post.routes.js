const express = require('express');
const router = express.Router();
const multer = require('multer')
const Post = require('../models/post.model')
const uploadCloud = require('../configs/cloudinary.config');
const ensureLogin = require('connect-ensure-login')


router.get('/create', (req, res) => res.render("post/create", ))


router.post('/create', [ensureLogin.ensureLoggedIn(), uploadCloud.single('imgFile')], (req, res, next) => {
    const {
        title,
        post
    } = req.body
    const imgPath = req.file.url
    const imgName = req.file.originalname
    Post.create({
            title: title,
            description: post,
            imgPath,
            imgName
        })
        .then(post => res.redirect('/'))
        .catch(error => console.log(error))
});

router.get('/', (req, res, next) => {
    Post.find()
        .then((posts) => res.render('post/index', {
            posts
        }))
        .catch((error) => console.log(error))
});
module.exports = router