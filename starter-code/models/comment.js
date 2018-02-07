const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = Schema({
  content: String,
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  imagePath: String,
  imageName: String
});

const CommentSchema = mongoose.model('User', UserSchema);

module.exports = User;