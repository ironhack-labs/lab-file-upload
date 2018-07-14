const express = require('express');
const router  = express.Router();
const Picture = require('../models/picture');
const User = require('../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
  if(req.user) res.render('index', { title: 'Express - Generated with IronGenerator', user: req.user.username });
  else res.render('index', { title: 'Express - Generated with IronGenerator'});
});

/*GET profile*/
router.get('/profile', (req, res, next) => {
  Picture.findById(req.user.profilePic)
    .then(pic=>{
      res.render('profile',{user: req.user, pic});
    })
});


module.exports = router;
