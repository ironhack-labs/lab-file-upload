const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: String,
  creatorId: String,
  picPath: String,
  picName: String,
  comments: [{
    content: String,
    authorId: String,
    imagePath: String,
    imageName: String,
  }]
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;