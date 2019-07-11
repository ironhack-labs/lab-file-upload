const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
  photo: {
    picName: String,
    picPath: String,
  },
  content: String,
  author: Schema.Types.ObjectId,
  postId: Schema.Types.ObjectId,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
