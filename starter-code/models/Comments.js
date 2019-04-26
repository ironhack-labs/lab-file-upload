const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema ({
  content:String,
  authorId: String,
  imagePath: String,
  imageName: String
}, {
  timestamps: true,
  versionKey: false
})

const Comments = mongoose.model('Comments', commentsSchema);
module.exports = Comments;