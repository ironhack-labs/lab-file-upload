const Posts = require("../models/posts");
const Comments = require("../models/comments");


exports.createPostView=(req,res,next)=>{
    res.render("posts/create",req.user)
}
exports.postPost=async(req,res,next)=>{
   const picPath = req.file.secure_url;
   const picName=req.file.originalname;
   const {content} = req.body;
   const {username} = req.user;
   const creator=username;
   //console.log(username)
    const newPost = {
      content,
      creator,
      picPath,
      picName
    }
    //console.log(newPost)
    await Posts.create(newPost)
    res.redirect('/')
}
exports.detailPost=async(req,res,next)=>{
  const {id}=req.params;
  const post=await Posts.findById(id)
  const comments=await Comments.find()
  //Aqui me quede ¿Como envio dos parametros: post y comments?
  res.render("posts/detailPost",post);
}


