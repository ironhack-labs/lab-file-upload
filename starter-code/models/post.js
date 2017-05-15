const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = Schema({
  content: String,
  creatorId: {type: Schema.Types.ObjectId },
  imagePath: String,
  imageName: String
});

const PostSchema = Schema({
  content: String,
  creatorId: {type: Schema.Types.ObjectId },
  picPath: String,
  picName: String,
  comments: [CommentSchema]
});

const Comment = mongoose.model('Comment', CommentSchema);
const Post = mongoose.model('Post', PostSchema);

module.exports = Comment;
module.exports = Post;
