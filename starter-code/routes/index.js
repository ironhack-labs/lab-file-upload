const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express / Tumblr-lab" });
});

router.get('/home', [ensureLoggedIn('/auth/login')], (req, res, next) => {
  res.render('home',{user:req.user});
});

module.exports = router;
