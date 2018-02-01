const express    = require('express');
const userController = require('../controllers/user.controller');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get('/profile', ensureLoggedIn('/login'),userController.show); 

module.exports = router;