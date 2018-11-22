const express = require('express');
require('dotenv');
const uploadCloud = require('../config/cloudinary.js')
const router = express.Router();
const User = require('../models/user.js');

/* GET home page. */
router.get('/', (req, res, next) => {
    User.find()
        .then((images) => {
            res.render('index', { images });
        })
        .catch((error) => {
            console.log(error);
        });

});


//actual write to cloudinary via the middleware specified in ../config/cloudinary.js
router.post('/img/add', uploadCloud.single('photo'), (req, res, next) => {
    //write preparation, extracting the values send via the form
    const { title, description } = req.body;
    const imgPath = req.file.url;
    const imgName = req.file.originalname;
    const newImg = new User({ title, description, imgPath, imgName })
        //actual write in mongo using mongoose
    newImage.save()
        .then(image => {
            res.redirect('/');
        })
        .catch(error => {
            console.log(error);
        })
});






module.exports = router;