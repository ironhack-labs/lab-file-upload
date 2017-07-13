const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
// const User = require('user');
const User = mongoose.model('User');

const postSchema = Schema({
  content: String,
  creatorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} ,
  pic_path: String,
  pic_name: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
