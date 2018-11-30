const express  = require("express");
const passport = require("passport");
const router   = express.Router();
const {ensureLoggedIn,ensureLoggedOut} = require("connect-ensure-login");


router.get("/",(req,res)=>{

});

router.post("/login", ensureLoggedOut(), passport.authenticate("local-login",{
    successRedirect : "/",
    failureRedirect : "/login",
    failureFlash : true
}));

module.exports = router;
