const express = require('express');
const router  = express.Router();
const User = require('../models/User');

//multer
const multer = require('multer');
const uploads = multer({dest: './public/assets'});
//cloudinary
const uploadCloud = require('../helpers/cloudinary');



module.exports = router;
