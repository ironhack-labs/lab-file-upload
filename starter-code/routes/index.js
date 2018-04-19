const express = require("express");
const uploadCloud = require("../config/cloudinary.js");
const User = require("../models/user");
const picture = require("../models/pictures");
const router = express.Router();

router.get("/", (req, res, next) => {
  const userId = req.session.passport.user;
  const imgPath = "";
  if (userId) {
    if (userId.profileImg) {
      imgPath = userId.profileImg.path;
    }
  }
  let userData = {
    userId,
    imgPath
  };

  res.render("index", { userData });
});

module.exports = router;
