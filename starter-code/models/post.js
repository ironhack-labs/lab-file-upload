const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = require('./comment');

const PostSchema = Schema({
  content: String,
  creatorId: String, // Should be a reference to tue userId
  picPath: String,
  picName: String,
  comments: [Comment]
});

module.exports = mongoose.model('Post', PostSchema);
