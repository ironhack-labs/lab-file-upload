const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
  photo: {
    picName: String,
    picPath: String,
  },
  content: String,
  owner: Schema.Types.ObjectId,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
