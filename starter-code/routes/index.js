const express = require('express');
const User = require('../models/user');
var multer  = require('multer');

const router  = express.Router();
var upload = multer({dest: './public/uploads/'});
//we require this bcs of we install multer

//var multer  = require('multer');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

router.post('/uploads',upload.single('photo'), function(req,res){
  res.send(req.files)
// const user = new User({
//   name : req.body.name,
//   email : req.body.email,
//   password :req.body.password
// });
//   user.save((err) => {
//     res.redirect('/');
  // });
});

router.get('/',function(req, res, next){
  User.find((err, user))
})



module.exports = router;
