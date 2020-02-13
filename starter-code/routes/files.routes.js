const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

const User = require('../models/User.model')



// Cloudinary
const uploadCloud = require("../configs/cloudinary.config");

router.get("/profile/upload-cloud", (req, res) => res.render("authentication/file-form-cloud"));
router.post(
  "/profile/upload-cloud",
  uploadCloud.single("phototoupload"),
  (req, res, next) => {
    console.log(
      "Y esto es lo que hace multer cuando colabora con Cloudinary",
      req.file
    );

    User.findByIdAndUpdate(req.user._id, {
      path: req.file.secure_url,
      pictureName: req.body.pictureName
    })
      .then(() => res.redirect("/profile"))
      .catch(err => next(err));
  }
);

module.exports = router;
