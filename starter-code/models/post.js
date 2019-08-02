const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const postSchema = new Schema({
  content: String,
  creatorId: ObjectId,
  picPath: String,
  picName: String
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;


