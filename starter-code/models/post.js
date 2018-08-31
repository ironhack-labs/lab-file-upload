const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  creatorId: Schema.Types.ObjectId,
  creatorName: String,
  picPath: String,
  picName: String,
})

const postSchema = new Schema({
  content: String,
  creatorId: Schema.Types.ObjectId,
  creatorName: String,
  picPath: String,
  picName: String,
  comments: [commentSchema],
});



const Post = mongoose.model('Post', postSchema);

module.exports = Post;
