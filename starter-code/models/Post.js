const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = Schema(
  {
    content: String,
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
    imagePath: String,
    imageName: String
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const PostSchema = Schema(
  {
    content: String,
    creatorId: { type: Schema.Types.ObjectId, ref: "User" },
    picPath: String,
    picName: String,
    comments: [CommentSchema]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  },
  {
    usePushEach: true
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
