const { mongoose, Schema } = require("mongoose");

const post = new Schema(
  {
    content: String,
    creatorId: String,
    picPatch: String,
    picName: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Post = mongoose.model("Post", post);
module.exports = Post;
