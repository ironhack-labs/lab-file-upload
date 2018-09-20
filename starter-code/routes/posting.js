const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });


router.get('/new-post', ensureLoggedIn('/login'), (req, res) => {
    res.render('new-post');
});

router.post('/new-post', ensureLoggedIn('/login'), (req,res) => {
    const {content} = req.body;
    const {picture} = req.file.path;

});