const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  authorId: Schema.Types.ObjectId,
  imagePath: String,
  imageName: String,
  postId: Schema.Types.ObjectId
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Commentary = mongoose.model("Commentary", commentSchema);
module.exports = Commentary;
