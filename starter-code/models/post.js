const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = Schema({
  content: {type: String, require:true},
  creatorId: {type: Schema.Types.ObjectId, ref:'User'},
  picPath: {type: String, require:true},
  picName: {type: String, require:true},
  comments: [{type: Schema.Types.ObjectId, ref:'Comment'}]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;