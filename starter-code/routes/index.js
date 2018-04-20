const express = require('express');
const router  = express.Router();
const multer  = require('multer');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

module.exports = router;
