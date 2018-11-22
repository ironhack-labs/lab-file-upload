const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId

const PostSchema = Schema({
  idUser: String,
  description: String,
  originalname: String,
  url: String,
  comments: [ { type : ObjectId, ref: 'Comment' } ],
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;