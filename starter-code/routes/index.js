const express = require('express');
const router = express.Router();
const post = require('../models/post')
const user = require('../models/user')

/* GET home page. */
// router.get('/', (req, res, next) => {
//   res.render('index', { title: 'Express - Generated with IronGenerator' });
// });

router.get('/', (req, res, next) => {
  post.find()
    .then(photoData => {
      res.render('index', {
        photoData
      })
    })
    .cath(
      error => console.log(error)
    )
});

router.get('/',(req, res, next) => {

});



module.exports = router;