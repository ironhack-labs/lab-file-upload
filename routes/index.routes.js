const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));

router.get('/post', (req, res, next) => {
  res.render('post-form')
})

module.exports = router;
