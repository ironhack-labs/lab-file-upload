const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: String,
    creatorId : {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    imgName: String,
    imgPath: String
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;