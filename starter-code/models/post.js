const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = Schema({
  content: String,
  creatorId:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  commentId:[{
    type:Schema.Types.ObjectId,
    ref:'Comment'
  }],
  picPath: String,
  picName: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;