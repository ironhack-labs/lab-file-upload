const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => res.render('index', { title: 'Express - Generated with IronGenerator' }))

router.get('/show', (req, res) => res.render('show'))


module.exports = router;
