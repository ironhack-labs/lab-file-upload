const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: String,
  name: String,
  path: String,
  originalName: String,
  comment: { type: String, default: null }

}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
