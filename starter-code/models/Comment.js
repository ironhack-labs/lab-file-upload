const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  text: {type: String, required: true},
  _post: {type: Schema.Types.ObjectId, required: true, ref: "Post"},
  _author: {type: Schema.Types.ObjectId, required: true, ref: "User"},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;