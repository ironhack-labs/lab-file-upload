const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema({
  content: String,
  creatorId: String,
  path: String,
  picName: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;