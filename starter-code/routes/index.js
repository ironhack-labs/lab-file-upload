const express = require('express');
const router = express.Router();
const multer = require('multer');
const Picture = require('../models/picture');
const upload = multer({ dest: './public/uploads/' });
const User = require('../models/user');


/* GET home page. */
router.get('/', (req, res, next) => {
    User
        .findById(req.session.passport.user)
        .then(myInfo => {
            res.render('index', { myInfo, title: 'Tumbler' });
        })
});

// router.get('/upload')
router.get('/uploads', function(req, res, next) {
    //mongoose finds all the photos in the db and passes them to the view
    Picture.find((err, pictures) => {
        //here we pass the pictures array to the view
        res.render('index', {
            pictures
        })
    })
});

router.post('/uploads', upload.single('photo'), (req, res) => {
    // console.log(req.file)

    const pic = new Picture({
        name: req.body.name,
        path: `/uploads/${req.file.filename}`,
        originalName: req.file.originalname
    });

    pic.save((err) => {
        res.redirect('/');
    });
});

module.exports = router;