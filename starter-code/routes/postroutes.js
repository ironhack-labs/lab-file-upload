const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const {
  getPostCreate,
  postPostCreate
} = require('../controllers/index.js')

router.get('/create', getPostCreate);
router.post('/create', uploadCloud.single('photo'), postPostCreate);


module.exports = router;