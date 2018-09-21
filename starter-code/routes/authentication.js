const express = require('express');
const passport = require('passport');
const router = express.Router();
const multer = require('multer');
const Post = require("../models/post.js")
const upload = multer({
    dest: './superpublic/public/uploads/'
});

const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', {
        message: req.flash('error')
    });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', {
        message: req.flash('error')
    });
});

router.post('/signup', ensureLoggedOut(), upload.single('photo'), passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user: req.user
    });
});
router.get('/new', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/new', {
        user: req.user
    });
});

router.post('/new', upload.single('photo'), (req, res, next) => {
    const {
        content
    } = req.body;
    const {
        originalname,
        path
    } = req.file;
    const id = req.user.id;
    new Post({
            content,
            id,
            photo: {
                originalname,
                path
            }
        })
        .save().then(post => {
            res.redirect("/")
        }).catch(err => {
            next(err)
        })

});

router.get('/newComment/:id', ensureLoggedIn('/login'), (req, res) => {
    let commentId = req.params.id;
    res.render('authentication/newComment', {
        commentId
    });
});

router.get('/comments/:id', ensureLoggedIn('/login'), (req, res) => {
    let commentId = req.params.id;
    Post.findById(commentId)
        .then(comment => {
            
            res.render('authentication/postDetail', {
                comment
            });
        }).catch(err => {
            next(err)
        })
});

router.post('/newComment/:id', upload.single('photo'), (req, res, next) => {
    postId = req.query.id
    const {
        content
    } = req.body;
    const {
        originalname,
        path
    } = req.file;
    const creatorId = req.user.id;
    Post.findByIdAndUpdate( postId, {
        
                comments: {
                    content,
                    creatorId,
                    photo: {
                        originalname,
                        path
                    }
                }
            }
        )
        .then(post => {
            res.render("index")
        })
        .catch((error) => {
            console.log(error)
        })

});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;