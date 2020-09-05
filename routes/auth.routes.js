// routes/auth.routes.js

const { Router } = require('express');
const router = new Router();
const routeGuard = require('../configs/route-guard.config');
const fileUpld = require("../configs/cloudinary")

const {
  loginProcess,
  loginView,
  signupProcess,
  signupView,
  logout
} = require("../controllers/auth")



// .get() route ==> to display the signup form to users
router.get('/signup', signupView);

// .post() route ==> to process form data
router.post('/signup', fileUpld.single("image"), signupProcess);


// .get() route ==> to display the login form to users
router.get('/login', loginView);

// .post() login route ==> to process form data
router.post('/login', loginProcess);



router.post('/logout', logout);

router.get('/userProfile', routeGuard, (req, res) => {
  res.render('users/user-profile');
});

module.exports = router;
