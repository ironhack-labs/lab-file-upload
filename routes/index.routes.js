const express = require('express');
const router = express.Router();
/* GET home page */
router.get('/', (req, res) => res.redirect('posts-view'));
module.exports = router;