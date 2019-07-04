const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
