const express = require('express');
const router = express.Router();
const User = require('../models/user')
/* GET home page. */
router.get('/', (req, res, next) => {
  User.find()
    .populate('picture')
    .then(users =>
      res.render('index', { users })
    )
    .catch(err => console.log(err))
})



module.exports = router;
