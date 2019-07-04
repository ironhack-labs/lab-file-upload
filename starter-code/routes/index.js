const express = require('express');
const router  = express.Router();
const User =require('../models/User')
const uploadCloud = require('../config/cloudinary')



/* GET home page. */
router.get('/', async (req, res, next) => {
  const users = await (User.find())
  res.render('index', { users });
});

//profile pictures route

 router.post('/signup', uploadCloud.single('picture'), async(req,res)=>{
   const {username, email, password}=req.body
  const {url: picture } = req.file
  await User.create({username,email,password,picture})
res.redirect('/')
 })

module.exports = router;
