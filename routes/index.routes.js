const express = require('express');
const router = express.Router();
const { postsView } = require("../controllers/post")


/* GET home page */
//router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));
router.get('/', postsView)

module.exports = router;