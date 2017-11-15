const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  username: String,
  email:    String,
  password: String,
  picture: { pic_path: String,
             pic_name: String
           }
});
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
