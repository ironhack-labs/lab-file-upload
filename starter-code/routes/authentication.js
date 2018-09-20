const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const Picture = require('../models/pictures');
const Post = require('../models/post');
const User = require('../models/user');


router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', [ensureLoggedOut(), upload.single('thumbnail')], passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/post/new', ensureLoggedIn('/login'), (req, res) => {
    res.render('post/new-post')
});

router.post('/post/new', [ensureLoggedIn('/login'), upload.single('photo')], (req, res) => {
    const {content,caption} = req.body;
    const creatorId = req.user._id;
    const pic = new Picture({
        path: `/uploads/${req.file.filename}`,
        originalName: req.file.originalname,
        name: caption
    });
    pic.save()
    .then(pic => {
        const post = new Post({
            content,
            creatorId,
            picPath: pic.path,
            picName: pic.name
        });
        return post.save()
    })
    .then(post => {
        res.redirect(`/post/${post._id}`);
    })
});



router.get('/post/:id', (req,res) => {
    const postId = req.params.id;
    Post.findById(postId)
    .populate('creatorId')
    .then( post => {
        console.log(post);
        res.render("post/single-post", post);
    })
  })

router.get('/delete/:id', ensureLoggedIn("/login"), (req,res) => {
    const postId = req.params.id;
    Post.findByIdAndRemove(postId)
    .then( post => {
        res.redirect("/");
    })
})










module.exports = router;
