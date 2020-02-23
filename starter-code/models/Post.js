const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String, 
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  picName: String,
  picPath: {
    type: String,
    default: 'https://img-9gag-fun.9cache.com/photo/aY7ZYEm_460swp.webp'
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;