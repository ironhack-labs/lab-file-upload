const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = Schema({
  content: String,
  creatoreId: {type:Schema.Types.ObjectId, ref:"User"},//new ObjectID,
  picPath: String,
  picName: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;