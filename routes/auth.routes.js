const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const mongoose = require('mongoose');
const multer  = require('multer')
const upload = multer({ dest: './uploads' })

const routeGuard = require('../configs/route-guard.config');
const authControllers = require('../controllers/auth.controllers');


router.get('/signup', authControllers.displaySignupForm);

router.post('/signup', upload.single('image'), authControllers.checkInputsAndCreateNewUser);

router.get('/login', authControllers.displayLoginForm);

router.post('/login', authControllers.loginUser);

router.post('/logout', authControllers.loggingOutUser);

router.get('/userProfile', routeGuard, authControllers.showUserProfile);

router.get('/post-form', authControllers.displayPostForm);

router.post('/new-post', upload.single('picPath'), authControllers.checkPostInputAndCreateNewPost);


module.exports = router;
