const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  { // here you set the author ID from the Author colection, so you can reference it
    content: {
      type: String,
    },
    creator: {
      type: mongoose.Schema.ObjectId, ref: "User"      
    },
    picPath: {
      type: String,
    },
    picName: {
      type: String,
    }
  },
    {
      timestamps: true
    }   
); 

const Post = mongoose.model('Post', postSchema);
module.exports = Post;