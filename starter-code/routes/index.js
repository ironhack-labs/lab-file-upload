const express = require('express');
const router  = express.Router();
const Post = require('../models/Post')
const passport   = require('passport');
/* GET home page. */
router.get('/', (req, res, next) => {
  const loggedUser = req.session.passport.user
  console.log(loggedUser)
  Post.find()
      .then((posts)=>{
        res.render('index', { title: 'Express - Generated with IronGenerator', posts, loggedUser});
      })
      .catch((err)=>console.log(err))

});

module.exports = router;
