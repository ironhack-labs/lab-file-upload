const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  content: String,
  creator: String,
  picPath: URL,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('post', userSchema);
module.exports = Post;