const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = Schema({
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  picture: { 
    picPath: String,
    picName: String,
  },
},
  {timestamp: true}
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
