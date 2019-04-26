const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  authorId: String,
  imagePath: String,
  imageName: String
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
});

module.exports = mongoose.model('Comment', commentSchema)
