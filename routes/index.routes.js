const express = require('express');
const router = express.Router();
const Picture = require('../models/picture');

/* GET home page */
router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));

module.exports = router;