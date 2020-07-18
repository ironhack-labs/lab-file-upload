const express = require('express');
const router = express.Router();
const multer = require('multer');
const Picture = require('../models/Picture.model');



/* GET home page */
router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));

module.exports = router;
