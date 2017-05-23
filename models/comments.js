const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {type: String},
    authorId: { type: Schema.Types.ObjectId},
    imagePath: {type: String, default: 'N/A'},
    imageName: {type: String},
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
