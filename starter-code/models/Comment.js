const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = Schema({
  content: String,
  authorId: String,
  imgName: String,
  imgPath: String
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;