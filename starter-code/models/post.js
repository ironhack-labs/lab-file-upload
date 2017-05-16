const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = Schema({
  imagePath: String,
  imageName: String,
  content: String,
  creatorId: {type: Schema.Types.ObjectId }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;

const PostSchema = Schema({
  content: String,
  creatorId: {type: Schema.Types.ObjectId },
  picPath: String,
  picName: String,
  comments: [CommentSchema]
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
