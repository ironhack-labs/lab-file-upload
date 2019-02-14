const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  comment:String,
  postId:{
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  author: String,
  authorId:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  imagePath:String
});

module.exports = mongoose.model('Comment', commentSchema);