const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const router = express.Router();
