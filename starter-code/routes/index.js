const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary')

const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');


router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Ironhack-Tumblr'
  });
});



module.exports = router;