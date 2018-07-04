const express    = require('express');
const uploadCloud= require('../config/cloudinary.js');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Post       = require('../models/post');
const User       = require('../models/user');

router.get('/', (req, res, next) => {
    Post.find()
        .then(post => {
            res.render('posts/show', {post})
        })
        .catch(err => {
            console.log('Oof we getting decked tonight boiis: ', err);
            next();
        })
});

router.get('/create', ensureLoggedIn('/login'), (req, res, next) => {
    res.render('posts/create');
    console.log(req.session)
}); 

router.post('/create', ensureLoggedIn('/login'), uploadCloud.single('photo'), (req, res, next) => {
    const content = req.body.content;
    const file = req.file;

    const newPost = new Post({
        content,
        creatorId: req.session.passport.user,
        picPath: file.secure_url,
        picName: file.originalname
    })
    
    newPost.save()
        .then(post => {
            res.redirect('/post');
        })
        .catch(err => {
            console.log('Keep your hands and feet inside the vehicle at all times: ', err);
            next();
        })
});

router.get('/comment/:id', ensureLoggedIn('/login'), (req, res, next) => {
    const id = req.params.id;
    res.render('comments/create', {id});
});

router.post('/comment/:id', ensureLoggedIn('/login'), uploadCloud.single('photo'), (req, res, next) => {
    let comment;
    if (req.file){
        comment = {
            content: req.body.content,
            authorId: req.session.passport.user,
            picPath: req.file.secure_url,
            picName: req.file.originalname
        };
    } else {
        comment = {
            content: req.body.content,
            authorId: req.session.passport.user
        };
    }
    
    // console.log(req.file);
    Post.findOne({'_id': req.params.id})
        .then(post => {
            post.comments.push(comment);
            post.save()
                .then(post => {
                    res.redirect('/post');
                    // console.log(post);
                })
                .catch(err => {
                    console.log('Can\'t help you out here be balling too hard:', err);
                    next();
                })
        })
        .catch(err => {
            console.log('Comment on me and i\'ll show you what it\'s really like to be criticised:', err);
            next();
        });
});

module.exports = router;