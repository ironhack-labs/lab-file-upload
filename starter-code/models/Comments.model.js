const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: String,
    imgName: String,
    imgPath: String,
    creatorId:  String,
    postId: String
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;