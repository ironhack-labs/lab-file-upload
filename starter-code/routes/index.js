const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const Picture = require('../models/picture');

/* GET home page */
router.get('/', function(req, res, next) {
    res.render('index')
});

module.exports = router;
