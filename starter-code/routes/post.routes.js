const express = require('express');
const router = express.Router();
const passport = require('passport')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const multer  = require('multer');
const upload = multer({ dest: '.public/upload'})

const User = require('../models/User.model')
const Posted = require('../models/post.model');


router.get('/posts', (req, res, next) => {
    
    Posted.find()
        .them(allPosted => res.render('post/list', {allPosted}))
        .catch(err => next(err))
})










module.exports = router;