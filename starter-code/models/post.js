const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content:      String,
  creatorId:    { type : Schema.Types.ObjectId, ref: 'User' },
  password:     String,
  imgName:      String,
  imgPath:      String,
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;




// content - Text belonging to the post
// creatorId - ObjectId of the post's creator
// picPath - Where the picture is stored
// picName - The picture's name