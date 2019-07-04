const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = Schema({
  content: String,
  authorId: Schema.ObjectId,
  imagePath: String,
  imageName: String
});

const postSchema = Schema({
  content: String,
  creatorId: Schema.ObjectId,
  picPath: String,
  picName: String,
  comments: [commentSchema]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;