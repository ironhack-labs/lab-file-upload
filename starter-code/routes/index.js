const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: './public/uploads/' });
const User = require('../models/User')

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/profile', (req, res, next) => {
    console.log("/profile => req.user.id : " + req.user.id)
    User
        .findOne({ _id: req.user._id })
        .then(oneuser => {
            res.render('auth/profile', { user: req.user });
        }).catch((err) => {
            console.log(err)
        });
});

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