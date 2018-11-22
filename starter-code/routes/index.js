const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

router.post('/', (req, res) => {
  let data = true;
  res.render('index', {data})
})


module.exports = router;

