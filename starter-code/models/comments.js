const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commSchema = new Schema(
  {
    username: String,
    commContent: {
      type: String,
      required: [true, "Comment can’t be empty"]
    },
    post_id: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

var Comment = mongoose.model("Comment", postSchema);
module.exports = Comment;