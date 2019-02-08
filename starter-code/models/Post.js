const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  // stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
  picPath: String,
  picName: String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
