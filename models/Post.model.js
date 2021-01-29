const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  // creatorId: {
  //   type: String,
  //   required: true
  // },
  picPath: {
    type: String,
    required: true
  },
  picName: {
    type: String,
    required: true
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
