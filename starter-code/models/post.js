const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = Schema({
  content: String,
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  picPath: String,
  picName: String,
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
