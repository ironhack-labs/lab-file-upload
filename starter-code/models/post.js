const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
  content: String, //Text belonging to the post
  creatorId: String, //ObjectId of the post 's creator
  picPath: String, //Where the picture is stored
  picName: String //The picture 's name
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;