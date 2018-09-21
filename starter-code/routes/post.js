const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const Post = require('../models/post')

router.get('/new', ensureLoggedIn('/login'),(req,res)=>{
    console.log(req.user)
    const {username,image}=req.user
    res.render('post/new',{username,image})
})
router.post('/new',[ensureLoggedIn('/login'),upload.single('pic')],(req,res)=>{
    console.log(req.file)
    const content=req.body.content
    const picPath=`/uploads/${req.file.filename}`
    const creatorId=req.user.id
    const picName=req.file.originalName
    Post.create({content,picPath,creatorId,picName})
    .then(()=>res.redirect('/'))
    .catch(e=>next(e))
})

module.exports = router;
