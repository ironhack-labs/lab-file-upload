const express = require('express');
const router = express.Router();
const { postView } = require("../control/post")

/* GET home page */
router.get('/', (req, res)=>{
  res.render("index")
});

router.get("/posts", postView)

module.exports = router;
