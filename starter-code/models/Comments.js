const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentsSchema = Schema ({
content: String,
authorId: String,
imagePath: String,
imageName: String
}, {
    timestamps: true
  });
  const Comments = mongoose.model('Comments', CommentsSchema);

  module.exports = Comments;