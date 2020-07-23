const express = require('express');
const router = express.Router();

const indexControllers = require('../controllers/index.controllers');

/* GET home page */
router.get('/', indexControllers.getAllPosts);

module.exports = router;
