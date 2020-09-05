const Post = require("../models/Post")
const User = require("../models/User.model")
const Comment =  require("../models/Comments")

//create comments
exports.comentView = (req, res)=>{
  res.render("coment")
}

exports.comentProcess = async (req, res)=>{
  const{content, imagename} = req.body;
  const { path } =  req.file;
  const newcoment = await Comment.create({
    content,
    imagename,
    imageURL : path,
    owner : req.session.currentUser._id
  })
  //agregue.....
  // await Post.findByIdAndUpdate(post._id,{
  //   $push:{comments:newcoment.id}
  // })
  // console.log(newcoment);
  res.render("index");
}

exports.viewComents = async (req, res)=>{
  const todos = await Comment.find().populate("owner");
  console.log(todos)
  res.render("coments", {todos})
}

