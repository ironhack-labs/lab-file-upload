require('dotenv');
const express = require('express');
const router  = express.Router();





/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index'), {post: req.post};
});


router.get("/userPage", (req, res, next) => {
  res.render("userPage", { user: req.user });
});






module.exports = router;
