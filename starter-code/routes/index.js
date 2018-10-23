const express = require('express');
const router  = express.Router();
const User = require("../models/user");
 function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect("/auth/login");
}
 /* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});
 router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', req.user)
});
 router.get('/profile/:id', (req, res) => {
  User.findById(req.params.id)
  .then(user => {
    res.render('profile', {user})
  })
  .catch(err => {
    console.log(err)
  });
});
 module.exports = router;