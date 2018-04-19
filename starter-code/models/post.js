const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  posterId: String,
  imgName: String,
  imgPath: String
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
