const express = require('express');
const router  = express.Router();
const Post= require('./models/post');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

router.get('/profile'),(req,res,next)=>{
  Post.find()
}


module.exports = router;
