const express = require('express');
const router  = express.Router();
const Form   = require('./../models/form');
const User   = require('./../models/user');
// const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

/* GET home page. */
router.get('/', (req, res, next) => {
  Form.find({})
  .then(posts => { 
    res.render('index', { posts })
    .then(posts => res.render('index', { posts }))
    .catch(err => console.log(err));
})
  .catch(err => console.log(err));
});

router.get('/post', (req, res) => {
  res.render('post', { message: req.flash('error')});
});

const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: '/node-file-tumblr',
  allowedFormats: [ 'jpg', 'png' ]
});

const upload = multer({ storage });

router.post('/post', upload.single('postImage'), (req, res) => {
  Form.create({
    postText: req.body.postText,
    username: req.user.username,
    creatorID: req.user._id,
    picPath: req.file.url,
    picName: req.file.originalname
  })
  .then(user => res.redirect('/'))
  .catch(err => console.log(err));
});

module.exports = router;
