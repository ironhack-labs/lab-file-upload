const router = require('express').Router()
const upload = require('../config/cloudinary')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const {
    loginView,
    loginPost,
    signupView,
    signupPost,
    profileView,
    // profilePost,
    logout
} =  require('../controllers/auth.controller')

router.get('/login', ensureLoggedOut(), loginView)

router.post('/login', ensureLoggedOut(), loginPost)

router.get('/signup', ensureLoggedOut(), signupView)

router.post(
    '/signup',
    ensureLoggedOut(),
    upload.single('imgURL'),
    signupPost
)

router.get('/profile', ensureLoggedIn('/login'), profileView)

router.get('/logout', ensureLoggedIn('/login'), logout);

module.exports = router;
