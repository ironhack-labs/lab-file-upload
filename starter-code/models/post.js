const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorID: String,
  photo:{
      path: String,
      originalname: String
  }
  }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = User;