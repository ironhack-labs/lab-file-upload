const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: String,
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  creatorName: { type: Schema.Types.ObjectId, ref: 'username' },
  picPath: String,
  picName: String,
  comments: [
    {
     comcontent: String,
     authorId:  { type: Schema.Types.ObjectId, ref: 'User' },
     comimagePath: String,
     comimageName: String
    }
  ]
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;