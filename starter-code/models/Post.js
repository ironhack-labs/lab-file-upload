const mongoose    = require('mongoose')

const postSchema = new mongoose.Schema({
  content: String,
  creatorId: String,
  picPath: String,
  picName: String
},{
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('Post', postSchema)