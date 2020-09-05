const Post = require("../models/Post")
const User = require("../models/User.model")
const mongoose = require('mongoose');
const upload = require('../configs/cloudinary');
const { Router } = require('express');
const { post } = require("../routes/index.routes");
const { deleteOne } = require("../models/User.model");
const router = new Router();




//create Post
exports.createView = (req, res)=>{
  res.render("users/create")
}

exports.postProcess = async(req,res)=>{
  const {content, imagename} =  req.body;
  const { path } =  req.file;
    if(content==="" || imagename===""){
      res.render("users/create", {error : "Te faltan los datos!!!"})
    }
  const user = req.session.currentUser
  console.log(user._id)
  const post = await Post.create({
    content,
    imagename,
    imageURL : path,
    owner: req.session.currentUser._id
  })
  console.log(post.owner)
  res.redirect("/")
}



//get posts
exports.postView = async(req, res)=>{
  const posts =  await Post.find().populate("owner");
  res.render("posts", {posts})
}


//get details
exports.detailView = async(req, res)=>{
  const {postId} = req.params;
  const post =  await Post.findById(postId).populate("owner");
  res.render("users/details", post)
}




//edit
exports.editPostView = (req, res)=>{
  res.render("users/edit")
}


exports.editProcess = async(req, res)=>{
  const {nameforsearch} = req.body
  const {imagename, content} = req.body;
  const { path } =  req.file;
  console.log(content);
  const postEdited = await Post.findOneAndUpdate(nameforsearch, {
    imagename,
    content,
    imageURL : path,
    owner: req.session.currentUser._id
  })
   console.log(postEdited)
   res.redirect('/userProfile');
}


//delete
exports.deleteView =  (req, res)=>{
  res.render("users/delete")
}

exports.deleteProcess = async(req, res)=>{
  const {imagename} = req.body;
  console.log(imagename)
  await Post.deleteOne({imagename})
  res.redirect('/userProfile');
}