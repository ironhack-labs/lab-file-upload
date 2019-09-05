const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const comments = new Schema (
  {
    content:String,
    authorId :{
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    picPath : String,
    picName : String,
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  });

  const Comments = mongoose.model("Comments", comments);

  module.exports = Comments;