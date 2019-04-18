const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

router.get('/login', (req, res) => {
  res.render('authentication/login', { message: req.flash('error')});
});

router.get('/signup',  (req, res) => {
  res.render('authentication/signup', { message: req.flash('error')});
});


module.exports = router;
