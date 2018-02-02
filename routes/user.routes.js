const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const secure = require('../configs/passport.config');

router.get('/:id', secure.isAuthenticated, userController.show);
router.get('/:id/edit', secure.isAuthenticated, userController.update);
router.post('/:id/', secure.isAuthenticated, userController.doUpdate);


// router.post('/signup', secure.nonAuthenticated, userController.doSignup);

// router.get('/login', secure.nonAuthenticated, userController.login);
// router.post('/login', secure.nonAuthenticated, userController.doLogin);

// router.get('/logout', secure.isAuthenticated, userController.logout);

module.exports = router;