const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorId: String,
  photo:{
    path: String,
    originalname:String
  },
  comments:{
    content: {trype :String ,default:""},
    creatorId: {trype :String ,default:""},
    photo:{
      path: {trype :String ,default:""},
      originalname:{trype :String ,default:""}
    }}
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;