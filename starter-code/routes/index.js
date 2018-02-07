const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/user');


/* GET home page. */
router.get('/', (req, res, next) => {
  User
  // .find({creatorId : User._id})
  .find({})
  .exec((err, users) => {
      res.render(`index`, {
          users
      });
  });

});



module.exports = router;
