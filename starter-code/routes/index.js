const { Router } = require('express');
const router = Router();
const User = require('./../models/user');

/*
router.post('/signup', (req, res, next) => {
  User.create({
  username: req.body.username,
  email: req.body.email,
  password: req.body.password,
  imageurl: req.file.imageurl
})
  .then(images => {
    console.log(images);
    res.render('index', { images });
  })
  .catch(error => next(error));
});
*/

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});




module.exports = router;
