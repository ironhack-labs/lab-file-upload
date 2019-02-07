const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = Schema({
  content: String,
  creatorId: { type: Schema.Types.ObjectId, ref: 'User'},
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  picPath: String,
  picName: String
})

module.exports= mongoose.model('Post', postSchema)