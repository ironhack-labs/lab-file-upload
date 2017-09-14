const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: [true, "Comment can't be empty"]
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  user_name: String,
  picture: {
    pic_path: String,
    pic_name: String
  }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
