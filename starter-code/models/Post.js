const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String, 
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  picName: String,
  picPath: {
    type: String,
    default: 'https://www.eluniversal.com.mx/sites/default/files/2020/01/30/meme-wey-ya.jpg'
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;