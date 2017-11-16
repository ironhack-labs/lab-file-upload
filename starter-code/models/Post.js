const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  authorId: { type: Schema.Types.ObjectId, ref: 'User'},
  imagePath: String,
  imageName: String,
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const postSchema = new Schema({
  title: String,
  content: String,
  creatorId: Schema.Types.ObjectId,
  picPath: String,
  picName: String,
  comments: [commentSchema]
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
