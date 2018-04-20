const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require("../config/cloudinary.js");


router.get('/new', ensureLoggedIn('/auth/login'), (req, res) => {

  res.render('post/new');
});


router.post("/new",[ensureLoggedIn(), uploadCloud.single("photo")],
passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/auth/login",
        failureFlash: true
    })
);







module.exports = router;
