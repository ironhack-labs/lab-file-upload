const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploader = require('../helpers/multer');
const User = require('../models/user');

router.get('/users', ensureLoggedIn(), (req, res, next) => {

  const { user } = req;

  User.find()
  .then( users => {
    res.render('users/index', { user, users });
  })
  .catch( error => console.log(error) );

});

module.exports = router;