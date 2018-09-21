const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorId: String,
  photo:{
    path: String,
    originalname:String
  },
  comments: [
    {
    authorId: String, 
    content: String}
  ]
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;