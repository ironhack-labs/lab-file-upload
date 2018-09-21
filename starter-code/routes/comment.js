const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const Post = require('../models/post')

router.get('/:id/comment/new', ensureLoggedIn('/login'),(req,res)=>{
    console.log(req.params.id)
    const {username,image}=req.user
    res.render('comment/new',{username,image,id:req.params.id})
})
router.post('/:id/comment/new',[ensureLoggedIn('/login'),upload.single('pic')],(req,res)=>{
    console.log(req.file)
    const {path,name} = (req.file)?req.file:{image:"",imageName:""}
    const id=req.params.id
    const content=req.body.content
    const imagePath=`/upload/${path}`
    const authorId=req.user.id
    const imageName=name
    Post.findByIdAndUpdate(id,{$push:{comments:{content,imagePath,authorId,imageName}}})
    .then(()=>res.redirect('/'))
    .catch(e=>next(e))
})

module.exports = router;
