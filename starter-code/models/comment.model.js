const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
  content: String,
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  imagePath: String,
  imageName: String
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;