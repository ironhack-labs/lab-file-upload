const express    = require('express');
const Post       = require('../models/Post');
const multer     = require('multer');
const upload     = multer({ dest: 'public/images/post-pictures' });
const router     = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');

module.exports = router;