const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const multer = require('multer');
const upload = multer({dest: './public/uploads'});
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");


module.exports = router;