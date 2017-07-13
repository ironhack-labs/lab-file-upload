
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  content: String,
  authorId: String,
  imagePath: String,
  imageName: String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});
const Posts = mongoose.model('Posts', UserSchema);
module.exports = Posts;
