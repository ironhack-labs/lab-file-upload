const Comments = require("../models/comments");

exports.commentView=(req,res,next)=>{
    res.render("comments/create",req.user)
}
exports.commentPost=async(req,res,next)=>{
   const {content} = req.body;
   const {username} = req.user;
   const creator=username;
    console.log(creator)
    const newComment = {
      content,
      creator
    }
    await Comments.create(newComment)
    res.redirect('/')
}
