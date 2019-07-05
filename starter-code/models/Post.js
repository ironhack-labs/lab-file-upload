const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const postSchema = new Schema({
  content: String,
  author: String,
  comments: String,
  imgName: String,
  imgPath: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;


// {type: Schema.Types.ObjectId, ref: "Comment"}
// {type: Schema.Types.ObjectId, ref: "User"},