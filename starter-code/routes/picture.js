const express    = require('express');
 const passport   = require('passport');
 const router     = express.Router();
 const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
 const multer  = require('multer');
 const upload = multer({ dest: './public/uploads' });
 
 const Picture = require("../models/Picture");



/* GET home page. */
router.get('/', function(req, res) {
  res.render('picture', { title: 'Express' });
});

 module.exports = router;