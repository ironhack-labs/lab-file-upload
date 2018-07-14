const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  pic: String,
  picName: String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;