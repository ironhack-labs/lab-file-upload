const express = require('express');
const router  = express.Router();
const User = require('../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
  User.find()
  .then((users) =>{
    res.render('index', { title: 'Tumblrrr', users: users});
  } )

});

module.exports = router;
