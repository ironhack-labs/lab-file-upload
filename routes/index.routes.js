const express = require('express');
const router = express.Router();

var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });

/* GET home page */
router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));

module.exports = router;
