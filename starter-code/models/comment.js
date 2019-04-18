const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = Schema({
  content: {type: String, require:true},
  authorId: {type: Schema.Types.ObjectId, ref:'User'},
  picPath: String,
  picName: String
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;