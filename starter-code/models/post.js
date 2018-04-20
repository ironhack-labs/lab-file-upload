const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = Schema(
  {
    content: String,
    creatorId: Schema.Types.ObjectId,
    picPath: String,
    picName: String
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
