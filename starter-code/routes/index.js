const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const Post = require('../models/post')

//multer
const multer = require('multer');
const upload = multer({dest: './public/assets'})

//for body req
const {bodyPost} = require('../helpers/body')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

// // post signup form
router.post('/signup', upload.single('photo'), bodyPost, (req,res,next)=>{
  req.body.photoURL = '/assets/'+req.file.filename;

    User.register(req.body, req.body.password)
    .then(user=>{
        res.redirect('/login')
    })
    .catch(e=>next(e));
})

module.exports = router;
