const express = require('express');
const router = express.Router();
const multer = require('multer')
const Post = require('../models/post.model')
const uploadCloud = require('../configs/cloudinary.config');
const ensureLogin = require('connect-ensure-login')

router.get('/create', (req, res) => res.render("post/create"))