const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: String,
  creatorId: Schema.Types.ObjectId,
  picPath: String,
  picName: String
});

const Post = mongoose.model("posts", postSchema);
module.exports = Post;
