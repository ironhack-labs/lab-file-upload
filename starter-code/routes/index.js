const express = require('express');
const router  = express.Router();

//console.log(uploadCloud);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

/* router.post('/signup', uploadCloud.single('profilepic'), (req, res, next) => {
 const bcryptSalt = 10;
 const salt = bcrypt.genSaltSync(bcryptSalt);
 const hashPass = bcrypt.hashSync(req.body.password, salt);
 const picturePath = req.file.url;
 console.log(picturePath);
 User
 .create({
    username: req.body.username,
    email:    req.body.email,
    password: hashPass,
    picture: picturePath
 })    
 .then(newUser => {
    res.render('index', { title: 'Express - Generated with IronGenerator' })
  }).catch(error => {
    console.log(error);
  })
}); */

module.exports = router;
