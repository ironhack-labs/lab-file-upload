const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  viewPostsCreate,
  createPost
} = require('../controllers/postControllers');
/* GET home page */
let title = 'App created with Ironhack generator 🚀'
//AQUI SE VE EL HOME
router.get('/',getAllPosts, (req, res) => {
  res.render('index')
});

module.exports = router;
