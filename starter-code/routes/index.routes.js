const express = require('express');
const passport = require('passport');
const router = express.Router();
const multer = require('multer')
const User = require('../models/User.model')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


/* GET home page. */
router.get('/', (req, res) => res.render('index', { title: 'Express - Generated with IronGenerator' }));


router.get('/post', ensureLoggedIn('/login'), (req, res, next) => res.render('posts/post-form'))


router.post('/post', ensureLoggedIn('/login'), (req, res, next) => {

    const { content } = req.body // Pago 20€ al TA que me diga por qué cojones req.body aparece aquí vacío
    console.log(content) 
})

module.exports = router;


