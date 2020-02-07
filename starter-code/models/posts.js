const mongoose = require("mongoose")
const Schema = mongoose.Schema


const postSchema = new Schema({
  content:  String,
  creator: String,
  picPath:   String,
  picName: String    
      },
      {
        timestamps: true,
        versionkey: false

      })

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
