const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");


router.get("/home", ensureLoggedIn("/login"), (req, res) => {
  res.render("authentication/home", {
    user: req.user
  });
});

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
  res.render("authentication/profile", {
    user: req.user
  });
});

router.get("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/login", ensureLoggedOut(), (req, res) => {
  res.render("authentication/login", { message: req.flash("error") });
});

router.post("/login", ensureLoggedOut(),
  passport.authenticate(
    "local-login", 
    { 
      successRedirect: "/", 
      failureRedirect: "/login", 
      failureFlash: true 
    }
  )
);

router.get("/signup", ensureLoggedOut(), (req, res) => {
  res.render("authentication/signup", { message: req.flash("error") });
});

router.post("/signup", ensureLoggedOut(),
 passport.authenticate("local-signup",
  { successRedirect: "/", failureRedirect: "/signup", failureFlash: true }
), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  /* if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    reject();
  } */


  /* +++++++++++
  +++++++++++
  +++++++++++
  +++++++++++ 
  ESTOY AQUI, viendo las estrellas...  
  +++++++++++
  +++++++++++
  +++++++++++
  +++++++++++ */
  res.redirect("/home")
}
)

module.exports = router;
