 const express    = require('express');
const passport   = require('passport');
const router     = express.Router(); 
const cloudinaryStorage = require('cloudinaryStorage');


 router.post('/signup', uploadCLoud.single('photoURL'),
(req,res,next)=>{
  User.register(
    {...req.body, photoURL: req.file.secure_url},
    req.body.password
  )})  

