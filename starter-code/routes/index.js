const express = require('express');
const router  = express.Router();
const Picture = require('../models/picture');
const { ensureLoggedIn } = require('connect-ensure-login');

/* GET home page. */
router.get('/', (req, res, next) => {
  if(req.user) res.render('index', { title: 'Express - Generated with IronGenerator', user: req.user.username });
  else res.render('index', { title: 'Express - Generated with IronGenerator'});
});

/*GET profile*/
router.get('/profile', ensureLoggedIn(), (req, res, next) => {
  Picture.findById(req.user.profilePic)
    .then(pic=>{
      console.log(pic);
      res.render('profile',{user: req.user, pic});
    })
});


module.exports = router;
