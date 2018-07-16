const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = Schema({
  creatorId: {type: Schema.ObjectId, ref: 'User'},
  content: String,
  picPath: String,
  picName: String,
  comments: [{ type: Schema.ObjectId, ref: 'Comment' }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
