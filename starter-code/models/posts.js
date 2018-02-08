const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    username: String,
    postContent: {
      type: String,
      required: [true, "Post can’t be empty"]
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    comments_arr: {
      type: [],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

var Post = mongoose.model("Post", postSchema);
module.exports = Post;