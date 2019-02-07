const express=require("express");
const router= express.Router();
const postModel=require('../models/post')
const cloudinary=require('../options/cloudinary')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const commentModel=require("../models/comment");




router.get("/",(req,res,next)=>{
    postModel
    .find()
    .then(posts=>res.render("posts/list-post",{posts}))
    .catch(err=>console.log("An errorkakvkakvavkav",err))
    
})

router.get("/add",ensureLoggedIn("/login"),(req,res,next)=>{

res.render("posts/add-post")

})

router.post("/add-comment/:id",cloudinary.single("photo"),(req,res,next)=>
{


const newPost= new postModel
    ({

    content:req.body.content,
    creatorId: req.user._id,
    picPath:req.file.secure_url,
    picName:req.file.originalname
    
    })

newPost
.save()
.then(() =>res.redirect("/posts/"))
.catch(err=>console.log("Wrong things"))

})

//Comentarios

router.post("/add-comment",(req,res,next)=>
{
    const newComment=new commentModel(
    {

    content:req.body.content,
    authorId: req.user._id,
    imagePath:req.file.secure_url,
    imageName:req.file.originalname


    })
    newComment.save()
    .then(comment=>
    {
    postModel.findByIdAndUpdate(req.params.id,{$push:{comments:comment._id}})
    })
    .then(()=>
    console.log("A comment was saved succesfully"))
    .catch(err=> console.log("Error grave",err))
    
    .catch(err=>console.log("An error ocurrer is other",err))
})

module.exports=router;