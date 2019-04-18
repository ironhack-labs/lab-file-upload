const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = Schema({
  content: String,
  authorId: Schema.Types.ObjectId,
  imagePath: String,
  imageName: String
});

const PostSchema = Schema({
  content: String,
  creatorId: Schema.Types.ObjectId,
  picPath: String,
  picName: String,
  comments: [CommentSchema]
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
