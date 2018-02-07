const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'   
  },
  picture: {
    type : Schema.Types.ObjectId,
    ref: 'Picture'
  },
  comments: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Comment'
      }
  ]
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
