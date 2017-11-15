const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  picPath: String,
  picName: String,
  comments: [CommentSchema]
})

module.exports = mongoose.model('Post', PostSchema);
