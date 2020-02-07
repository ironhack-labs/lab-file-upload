const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const postSchema = new Schema({
  content: String,
  creatorId: String,
  picPath: String,
  picName: String
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
});

module.exports = mongoose.model('Post', postSchema)