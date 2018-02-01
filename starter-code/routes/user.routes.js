const express    = require('express');
const userController = require('../controllers/user.controller');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const multer    = require('multer');
// Route to upload from project base path
const upload = multer({ dest: '../public/uploads/' });

router.get('/profile', ensureLoggedIn('/login'),userController.show); 
router.post('/upload', ensureLoggedIn('/login'),upload.single('photo'),userController.upload); 

module.exports = router;