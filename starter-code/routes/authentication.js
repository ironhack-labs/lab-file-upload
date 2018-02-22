const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const multer= require("multer")
const User               = require('../models/user');
const Picture              = require('../models/Picture');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

var upload = multer({ dest: './public/images/' });





module.exports = router;
