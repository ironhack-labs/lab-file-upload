const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  authorId: { type: Schema.ObjectId, ref: "User" },
  imagepath: String,
  imageName: String
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
