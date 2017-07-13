const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  userId: String,
  comments:    String,
  pic_path : String,
  pic_name: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
