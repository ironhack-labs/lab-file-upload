const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
  content: String,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  picture: { 
    picPath: String,
    picName: String,
  },
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}], //sempre referencia o model
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
