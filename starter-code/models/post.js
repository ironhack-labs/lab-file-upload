const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  picPath: String,
  picName: String
});

PostSchema.set('timestamps', true);

const Post = mongoose.model('Post', PostSchema);
