const express=require("express");
cons router=express.Router;


router.get("/",(req,res,next)=>{
    res.render("list-post");
})