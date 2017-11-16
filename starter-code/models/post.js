const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const PostSchema = new Schema({
  content: String,
  creatorId: String,
  picture-path: String,
  picture-name: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});


module.exports = Post;
