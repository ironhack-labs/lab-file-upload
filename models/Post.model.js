const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  creatorId: {
    type: String,
    required: true
  },
  picPath: {
    type: String
  },
  picName: {
    type: String
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
