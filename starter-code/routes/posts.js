const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("list-post")
})

module.exports = router;