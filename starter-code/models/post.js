const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: String,
  creatorId: String,
  picPath: String,
  picName: String,
  comments: [
    {
      creatorId: String,
      content: String,
      imagePath: String,
      imageName: String
    }
  ]
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
