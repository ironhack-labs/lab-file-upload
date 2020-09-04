const Post = require("../models/Post")


exports.getIndex = async(req, res) => {
  const posts = await Post.find().populate("creatorId");
  res.render('index', { title: 'App created with Ironhack generator 🚀', posts });
};