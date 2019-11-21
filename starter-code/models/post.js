const mongoose = require('mongoose');

const Schema   = mongoose.Schema;


const PostSchema = Schema({
  creatorId: String,
  content: String,
  imgURL: String,
  imgName: String
});


const Post = mongoose.model('Post', PostSchema);


module.exports = Post;