const express = require('express');

const router = express.Router();

// const Picture = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

module.exports = router;
