
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User = require('User');


// should allow us to identify who is posting what.
const postSchema = new Schema({
  content: String,
  creatorId: [userSchema.id],
  pic_path: [pictureSchema.pic_path],
  pic_name: [pictureSchema.pic_name]
});




const Post = mongoose.model('Post', postSchema);
module.exports = Post;
