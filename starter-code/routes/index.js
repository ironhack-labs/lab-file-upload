const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/user')


/* GET home page. */
router.get('/', (req, res, next) => {
  User
  // .find({creatorId : User._id})
  .find(})
  .sort({
      created_at: -1
  })
  .exec((err, posts) => {
      console.log(posts);
      res.render(`/index`, {
          posts,
          moment
      });
  });
//ARREGLAR ESTO

});



module.exports = router;
