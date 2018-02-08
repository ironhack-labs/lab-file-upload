const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: {
    type: String,
    required: [true, "Post can't be empty"]
  },
  creatorId:    {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  picPath: String,
  picName: String
  
  
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
