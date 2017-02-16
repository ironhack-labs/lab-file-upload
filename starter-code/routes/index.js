/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    isLoggedIn: req.isAuthenticated()
  });
});

module.exports = router;
