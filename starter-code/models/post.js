const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
  img: {type: Schema.Types.ObjectId, ref: 'Picture'}
}, {
  timestamps:{ createdAt: 'createdAT', updatedAt:'updatedAt'}
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
