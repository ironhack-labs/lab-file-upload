const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = Schema({
  creatorID: String,
  content: String,
  path: String,
  originalname: String
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
