const mongoose = require('mongoose');
const Schema    = mongoose.Schema;

const postSchema = new Schema({
  content: String,
  creatorId: Schema.Types.ObjectId,
  picPath: String,
  picName: String
});

const Post = mongoose.model("posts", postSchema);
module.exports = Post;
