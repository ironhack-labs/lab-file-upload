const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  pic_path: String,
  pic_name: String,
  creatorId: String,
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
