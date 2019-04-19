const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const mongoose = require('mongoose');
const Posts = require('../models/post');
const multer = require('multer');
const upload = multer({dest: './public/uploads'});


