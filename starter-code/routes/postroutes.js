const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const {
  getPostCreate
} = require('../controllers/index.js')

router.get('/create', getPostCreate);

module.exports = router;