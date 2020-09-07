const express = require('express');
const router = express.Router();
// const {
//   addProfile
// } = require("../controllers/profilepic")

// const upload = require("../configs/cloudinary")

// const { isAuth } = require("../middlewares")

// router.post("auth/signup", isAuth, upload.single("profile-pic"), addProfile)

/* GET home page */
router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));

module.exports = router;
