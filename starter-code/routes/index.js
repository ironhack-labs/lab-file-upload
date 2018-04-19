const express = require("express");
const router = express.Router();
const User = require("../models/user");

/* GET home page. */
router.get("/", (req, res, next) => {
  User.find().then(user => {
    console.log(user);
    res.render("index", { title: "Express - Generated with IronGenerator", user });
  });
});

module.exports = router;
