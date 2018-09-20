const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ImagePostSchema = Schema({
  content: String,
  creatorID: String,
  picName: String,
  picPath: String
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const ImagePost = mongoose.model('ImagePost', ImagePostSchema);

module.exports = ImagePost;