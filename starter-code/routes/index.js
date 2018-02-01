const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});
router.get('/error', (req, res, next) => {
  res.render('error');
});

module.exports = router;
