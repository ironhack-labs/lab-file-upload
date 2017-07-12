const express =  require('express');
const route = express.Router();
const User = require('../models/user');
const multer = require('multer');
const path    = require('path');
const post = require('../models/post');

//router.get('post/new-post',
