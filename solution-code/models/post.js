require('./user.js');

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
  picPath: String,
  picName: String,
  comments: [
    {
      content: String,
      authorId: {type: Schema.Types.ObjectId, ref: 'User'},
      imagePath: String,
      imageName: String
    }
  ]
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
