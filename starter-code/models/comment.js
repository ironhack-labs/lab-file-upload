const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  creatorId: ObjectId,
  picPath: String,
  picName: String
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;