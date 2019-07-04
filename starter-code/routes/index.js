const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: './public/uploads/' });
const User = require('../models/User')
const PostBlog = require('../models/Post')

/* GET home page */
router.get('/', (req, res, next) => {
    PostBlog.
    find()
        .then(posts => {
            res.render('index', { posts })
        }).catch((err) => {
            console.log(err)
        });
});

router.get('/profile', ensureAuthenticated, (req, res, next) => {
    User
        .findOne({ _id: req.user._id })
        .then(oneuser => {
            res.render('auth/profile', { user: req.user });
        }).catch((err) => {
            console.log(err)
            res.redirect('/')
        });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/login')
    }
}

router.post('/upload', upload.single('photo'), (req, res) => {
    User
        .findByIdAndUpdate(req.body._id, {
            picture: {
                namePict: req.body.name,
                pathPict: `/uploads/${req.file.filename}`,
                originalNamePict: req.file.originalname
            }
        })
        .then(updateprofile => {
            res.redirect("/profile")
        })
        .catch((err) => {
            console.log(err)
        });
});

module.exports = router;