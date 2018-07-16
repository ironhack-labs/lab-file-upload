const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = Schema({
  content: {type: String},
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  picPath: {type: String},
  picName: {type: String}
},
 {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
