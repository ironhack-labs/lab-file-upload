const express = require('express');
const User = require('../models/user')
const router  = express.Router();


/* GET home page. */
// router.get('/', (req, res, next) => {
//   res.render('index', { title: 'Express - Generated with IronGenerator' });
// });

router.get("/", (req, res) => {
  User
      .find({})

      .exec((err, users) => {
          console.log(users)
          res.render("index", {
              users
          });
      });
});


module.exports = router;
