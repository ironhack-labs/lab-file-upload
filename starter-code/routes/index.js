const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title1: 'Express - Generated with IronGenerator' });
});

module.exports = router;
