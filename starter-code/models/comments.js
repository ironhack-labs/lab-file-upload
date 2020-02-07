const mongoose = require("mongoose")
const Schema = mongoose.Schema


const commentSchema = new Schema({
  content:  String,
  creator: String, 
      },
      {
        timestamps: true,
        versionkey: false

      })

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
