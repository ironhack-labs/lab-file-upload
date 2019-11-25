const express = require('express');
const router  = express.Router();

const Photo = require("../models/Photo");

/* GET home page. */
router.get('/', async (req, res, next) => {
  const photos = await Photo.find();
  res.render('index', { photos });
});

module.exports = router;
