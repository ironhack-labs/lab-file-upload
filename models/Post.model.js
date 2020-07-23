const mongoose = require("mongoose");

require('./User.model');

const postSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      required: true
    },
    picPath: String,
    picName: String
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;